import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Окремий рекурсивний компонент для відображення коментаря
function Comment({ comment, onReply, onVote, level = 1 }) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [authorName, setAuthorName] = useState('');

  const MAX_LEVEL = 3;

  const handleAddReply = (e) => {
    e.preventDefault();
    if (!replyText.trim() || !authorName.trim()) return;

    onReply(comment.id, authorName, replyText);
    setReplyText('');
    setAuthorName('');
    setShowReplyForm(false);
  };

  return (
    <div className={`comment-item level-${level}`}>
      <div className="comment-header">
        <span className="comment-author">{comment.author}</span>
        <span className="comment-date">{comment.createdAt}</span>
      </div>

      <p className="comment-text">{comment.text}</p>

      <div className="comment-actions">
        <button 
          className="vote-btn like-btn" 
          onClick={() => onVote(comment.id, 'like')}
        >
          👍 {comment.likes}
        </button>
        <button 
          className="vote-btn dislike-btn" 
          onClick={() => onVote(comment.id, 'dislike')}
        >
          👎 {comment.dislikes}
        </button>

        {level < MAX_LEVEL && (
          <button 
            className="reply-btn" 
            onClick={() => setShowReplyForm(!showReplyForm)}
          >
            {showReplyForm ? 'Скасувати' : 'Відповісти'}
          </button>
        )}
      </div>

      {/* Форма для відповіді */}
      {showReplyForm && (
        <form className="reply-form" onSubmit={handleAddReply}>
          <input
            type="text"
            placeholder="Ваше ім'я"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="comment-input"
            required
          />
          <textarea
            placeholder="Напишіть відповідь..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            className="comment-textarea"
            required
          />
          <button type="submit" className="submit-btn">Опублікувати відповідь</button>
        </form>
      )}

      {/* Рекурсивний рендеринг вкладених коментарів */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="nested-comments">
          {comment.replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              onReply={onReply}
              onVote={onVote}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Головний компонент системи коментарів
export function CommentSystem() {
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'Олексій',
      text: 'Дуже цікавий каталог товарів! Чи планується додавання нових категорій?',
      createdAt: '24.09.2026, 14:30',
      likes: 5,
      dislikes: 0,
      replies: [
        {
          id: 2,
          author: 'Адмін',
          text: 'Дякуємо! Так, наступного тижня додамо розділ "Офісна техніка".',
          createdAt: '24.09.2026, 15:00',
          likes: 3,
          dislikes: 0,
          replies: [
            {
              id: 3,
              author: 'Олексій',
              text: 'Чудово, чекатиму на оновлення!',
              createdAt: '24.09.2026, 15:15',
              likes: 1,
              dislikes: 0,
              replies: []
            }
          ]
        }
      ]
    },
    {
      id: 4,
      author: 'Марія',
      text: 'Чи є доставка в інші міста?',
      createdAt: '24.09.2026, 12:10',
      likes: 2,
      dislikes: 1,
      replies: []
    }
  ]);

  const [sortBy, setSortBy] = useState('date'); // 'date' або 'rating'
  const [newAuthor, setNewAuthor] = useState('');
  const [newText, setNewText] = useState('');

  // Додавання коментаря верхнього рівня
  const handleAddRootComment = (e) => {
    e.preventDefault();
    if (!newText.trim() || !newAuthor.trim()) return;

    const newComment = {
      id: Date.now(),
      author: newAuthor,
      text: newText,
      createdAt: new Date().toLocaleString('uk-UA'),
      likes: 0,
      dislikes: 0,
      replies: []
    };

    setComments([newComment, ...comments]);
    setNewAuthor('');
    setNewText('');
  };

  // Рекурсивне додавання відповіді
  const handleReply = (parentId, author, text) => {
    const addReplyRecursive = (list) => {
      return list.map((item) => {
        if (item.id === parentId) {
          return {
            ...item,
            replies: [
              ...item.replies,
              {
                id: Date.now(),
                author,
                text,
                createdAt: new Date().toLocaleString('uk-UA'),
                likes: 0,
                dislikes: 0,
                replies: []
              }
            ]
          };
        }
        if (item.replies.length > 0) {
          return { ...item, replies: addReplyRecursive(item.replies) };
        }
        return item;
      });
    };

    setComments(addReplyRecursive(comments));
  };

  // Рекурсивна зміна лайків/дизлайків
  const handleVote = (commentId, type) => {
    const voteRecursive = (list) => {
      return list.map((item) => {
        if (item.id === commentId) {
          return {
            ...item,
            likes: type === 'like' ? item.likes + 1 : item.likes,
            dislikes: type === 'dislike' ? item.dislikes + 1 : item.dislikes
          };
        }
        if (item.replies.length > 0) {
          return { ...item, replies: voteRecursive(item.replies) };
        }
        return item;
      });
    };

    setComments(voteRecursive(comments));
  };

  // Сортування коментарів
  const sortComments = (list) => {
    const sorted = [...list].sort((a, b) => {
      if (sortBy === 'rating') {
        return (b.likes - b.dislikes) - (a.likes - a.dislikes);
      }
      return b.id - a.id; // сортування за датою (новіші зверху)
    });

    return sorted.map((item) => ({
      ...item,
      replies: item.replies.length > 0 ? sortComments(item.replies) : []
    }));
  };

  const sortedComments = sortComments(comments);

  return (
    <div className="comments-system-container">
      <h2 className="comments-title">Обговорення та коментарі</h2>

      {/* Форма додавання головного коментаря */}
      <form className="main-comment-form" onSubmit={handleAddRootComment}>
        <h3>Залишити коментар</h3>
        <input
          type="text"
          placeholder="Ваше ім'я"
          value={newAuthor}
          onChange={(e) => setNewAuthor(e.target.value)}
          className="comment-input"
          required
        />
        <textarea
          placeholder="Напишіть Ваш коментар..."
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          className="comment-textarea"
          required
        />
        <button type="submit" className="submit-btn primary-btn">Опублікувати</button>
      </form>

      {/* Панель сортування */}
      <div className="comments-sort-panel">
        <label>Сортувати за: </label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="control-select">
          <option value="date">Датою (спочатку нові)</option>
          <option value="rating">Рейтингом (найкращі)</option>
        </select>
      </div>

      {/* Список коментарів */}
      <div className="comments-list">
        {sortedComments.length === 0 ? (
          <p className="no-comments">Поки немає коментарів. Будьте першим!</p>
        ) : (
          sortedComments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              onReply={handleReply}
              onVote={handleVote}
              level={1}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default CommentSystem;
