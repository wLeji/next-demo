import React from 'react';

type Leader = {
    id: number;
    name: string;
    score: number;
};

const leaderboardData: Leader[] = [
    { id: 1, name: 'Alice', score: 95 },
    { id: 2, name: 'Bob', score: 90 },
    { id: 3, name: 'Charlie', score: 85 },
    { id: 4, name: 'Diana', score: 80 },
    { id: 5, name: 'Eve', score: 75 },
];

const Leaderboard = () => {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Leaderboard</h1>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Rank</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboardData.map((leader, index) => (
                        <tr key={leader.id}>
                            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                                {index + 1}
                            </td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{leader.name}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                                {leader.score}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Leaderboard;