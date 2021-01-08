import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { userService } from '../../service/service';
import { Gender } from './gender';

function List({ match }) {

    const { path } = match;
    const [users, setUsers] = useState(null);


    useEffect(() => {
        userService.getAll().then(x => { setUsers(x); console.log(x); });
    }, []);

    function deleteUser(id) {
        setUsers(users.map(x => {
           if (x.employeeId === id) { x.isDeleting = true; }
            return x;
        }));
        userService.delete(id).then(() => {
            setUsers(users => users.filter(x => x.employeeId !== id));
        });
    }

    function getGender(id) {
       var jsonObj = Gender;
        console.log(jsonObj[1]);
        for (var key in jsonObj) {
            if (jsonObj[key] === id) { return key }
        }

    }

    return (

        <div>
            <h1>Users</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add User</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Name</th>
                        <th style={{ width: '30%' }}>Gendar</th>
                        <th style={{ width: '30%' }}>Department</th>
                        <th style={{ width: '30%' }}>Email</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map(user =>
                        <tr key={user.employeeId}>
                            <td>{user.firstName} {user.lastName}</td>
                            <td>{getGender(user.gender)}</td>
                            {/* <td>male</td> */}
                            <td>{user.department.departmentName}</td>
                            <td>{user.email}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${user.employeeId}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteUser(user.employeeId)} className="btn btn-sm btn-danger btn-delete-user" disabled={user.isDeleting}>
                                    {user.isDeleting
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!users &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {users && !users.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No Users To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export { List };