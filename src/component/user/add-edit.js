import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { userService } from '../../service/service';


function AddEdit({ history, match }) {
    const { id } = match.params;
    const isAddMode = !id;
    // form validation rules 
    const validationSchema = Yup.object().shape({

        firstName: Yup.string()
            .required('First Name is required'),
        lastName: Yup.string()
            .required('Last Name is required'),
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        dateOfBrith: Yup.string()
            .required('Date is required'),

    });
    // functions to build form returned by useForm() hook
    const { register, handleSubmit, reset, setValue, getValues, errors, formState } = useForm({
        resolver: yupResolver(validationSchema)
    });
    function onSubmit(data) {
        return isAddMode
            ? createUser(data)
            : updateUser(id, data);
    }

    function createUser(data) {
       
        data.departmentId = +data.departmentName;
        data.department = null;
        data.gender = +data.gender;
        data.employeeId = 0;
        console.log(data);
        return userService.create(data)
            .then(() => {
                //   alertService.success('User added', { keepAfterRouteChange: true });
                history.push('.');
            })
        //  .catch(alertService.error);
    }

    function updateUser(id, data) {
        console.log(user);
        const obj={
            dateOfBrith:new Date(data.dateOfBrith),
            department:user.department,
            departmentId:+data.departmentName,
            email:data.email,
            employeeId:user.employeeId,
            firstName:data.firstName,
            lastName:data.lastName,
            gender:+data.gender
        }
        return userService.update(id, obj)
            .then(() => {
                //  alertService.success('User updated', { keepAfterRouteChange: true });
                history.push('..');
            })
        // .catch(alertService.error);
    }
    const [user, setUser] = useState({});


    useEffect(() => {
        if (!isAddMode) {
            // get user and set form fields
            userService.getById(id).then(user => {
                const fields = ['firstName', 'lastName', 'email', 'gender', 'dateOfBrith', 'departmentName','department','departmentId','employeeId'];
                fields.forEach(field => {
                    if (field === 'departmentName') { user.departmentName = user.departmentId; }
                    if (field === 'dateOfBrith') {
                    
                        const date = new Date(user.dateOfBrith);
                        var datestring = date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2);
                        console.log(datestring);
                        user.dateOfBrith = datestring;
                    }
                    setValue(field, user[field])
                });
                setUser(user);
            });
        }
    }, []);
    return (
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{isAddMode ? 'Add User' : 'Edit User'}</h1>
            <div className="form-row">

                <div className="form-group col-5">
                    <label>First Name</label>
                    <input name="firstName" type="text" ref={register} className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.firstName?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>Last Name</label>
                    <input name="lastName" type="text" ref={register} className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.lastName?.message}</div>
                </div>
            </div>
            <div className="form-row">

                <div className="form-group col-5">
                    <label>Email</label>
                    <input name="email" type="text" ref={register} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>Department</label>
                    {/* <input name="lastName" type="text" ref={register} className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} /> */}
                    <select name="departmentName" ref={register} className={`form-control ${errors.department ? 'is-invalid' : ''}`}>
                        {/* <option value=""></option> */}
                        <option value="1">IT</option>
                        <option value="2">HR</option>
                        <option value="3">PayRoll</option>
                        <option value="4">Admin</option>
                    </select>
                    <div className="invalid-feedback">{errors.lastName?.message}</div>
                </div>
            </div>
            <div className="form-row">

                <div className="form-group col-5">
                    <label>Gender</label>
                    <select name="gender" ref={register} className={`form-control ${errors.gender ? 'is-invalid' : ''}`}>
                        <option value="0">Male</option>
                        <option value="1">Female</option>
                        <option value="2">other</option>

                    </select>
                    <div className="invalid-feedback">{errors.geder?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>DOB</label>
                    <input name="dateOfBrith" type="date" ref={register} className={`form-control ${errors.dateOfBrith ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.dateOfBrith?.message}</div>

                </div>
            </div>
            <div className="form-group">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                Save
            </button>
                <Link to={isAddMode ? '.' : '..'} className="btn btn-link">Cancel</Link>
            </div>
        </form>
    );
}

export { AddEdit };