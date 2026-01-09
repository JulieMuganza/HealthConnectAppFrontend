import React from 'react';
import Card from '../common/Card';
import './StatsWidget.css';

const StatsWidget = ({ stats }) => {
    return (
        <div className="stats-grid">
            <Card className="stat-card">
                <div className="stat-content">
                    <h3>{stats.progressLabel}</h3>
                    <div className="stat-value-row">
                        <span className="stat-value">{stats.progress}</span>
                        <span className="stat-change positive">{stats.progressChange}</span>
                    </div>
                    <div className="progress-mini">
                        <div className="progress-fill" style={{ width: '60%' }}></div>
                    </div>
                </div>
            </Card>
            <Card className="stat-card">
                <div className="stat-content">
                    <h3>{stats.sessionsLabel}</h3>
                    <div className="stat-value-row">
                        <span className="stat-value">{stats.sessions}</span>
                        <span className="stat-change neutral">{stats.sessionsChange}</span>
                    </div>
                    <div className="progress-mini">
                        <div className="progress-fill" style={{ width: '90%', background: 'var(--secondary-color)' }}></div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default StatsWidget;
