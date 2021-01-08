import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <h1>React - CRUD Example with React Hook Form</h1>
            <p><Link to="users">&gt;&gt; Users</Link></p>
        </div>
    );
}

export { Home };