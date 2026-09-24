import React, { useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter } from './Card';

function Dashboard() {
  const [likes, setLikes] = useState(0);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Панель керування (Dashboard)</h2>

      <div className="dashboard-grid">
        {/* 1. Статистична картка */}
        <Card variant="primary" size="small" shadow={true} border={true}>
          <CardHeader>
            <h3>📊 Статистика</h3>
          </CardHeader>
          <CardBody>
            <p className="stat-number">1,248</p>
            <p>Активних користувачів за місяць</p>
          </CardBody>
          <CardFooter>
            <small>Оновлено 5 хвилин тому</small>
          </CardFooter>
        </Card>

        {/* 2. Інформаційна картка */}
        <Card variant="success" size="medium" shadow={true} border={true}>
          <CardHeader>
            <h3>ℹ️ Інформація</h3>
          </CardHeader>
          <CardBody>
            <h4>Реліз версії 2.0</h4>
            <p>Успішно впроваджено нову систему композиції компонентів React та валідацію типів.</p>
          </CardBody>
          <CardFooter>
            <span className="status-tag">Статус: Успішно</span>
          </CardFooter>
        </Card>

        {/* 3. Інтерактивна картка */}
        <Card variant="warning" size="medium" shadow={true} border={true}>
          <CardHeader>
            <h3>⚡ Інтерактив</h3>
          </CardHeader>
          <CardBody>
            <p>Взаємодійте з цією карткою за допомогою кнопки нижче:</p>
            <p>Вподобайок: <strong>{likes}</strong></p>
          </CardBody>
          <CardFooter>
            <button className="like-btn" onClick={() => setLikes(likes + 1)}>
              ❤️ Поставити лайк
            </button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
