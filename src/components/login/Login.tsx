import { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";
import { Checkbox } from "../checkbox/Checkbox";
import { Button } from "../button/Button";
import './loginStyles.scss';
import { Formik, useFormik } from "formik";
import * as Yup from 'yup'


export type LoginValues = {
    email: string
    password: string
    remember: boolean
}

const validationSchema = Yup.object().shape({
    email: Yup.string().email().required('Type your email'),
    password: Yup.string().required('Type your password').min(3, 'Password is too short'),
})

export const Login: FC = () => {
    const {handleSubmit, getFieldProps, touched, errors, resetForm} = useFormik<LoginValues>({
        initialValues: {
            email: '',
            password: '',
            remember: false
        },
        onSubmit: (values) => {
            console.log(values)
            resetForm()
        },
        validationSchema
    })

    return <form className="login_form" onSubmit={handleSubmit}>
        <h1 className="login_header">Log in</h1>
        <div className={'form_head'}>
            <p>To log in get registered
                <a href={'https://social-network.samuraijs.com/'}
                    target={'_blank'}> here
                </a>
            </p>
            <p>or use common test account credentials:</p>
            <p><b>Email:</b> free@samuraijs.com</p>
            <p><b>Password:</b> free</p>
        </div>
        <fieldset className="form_fields_wrapper">
            <div className="login_input_wrapper">
                <input type={'email'} placeholder="Email" autoComplete="off" {...getFieldProps('email')}/>
                {touched.email && errors.email && <span className="error_message">{errors.email}</span>}
            </div>
            <div className="login_input_wrapper">
                <input type={'password'} placeholder="Password" {...getFieldProps('password')}/>
                {touched.password && errors.password && <span className="error_message">{errors.password}</span>}
            </div>
            <label className="login_input_label">
                <Checkbox id={'login_form_remember_checkbox'} {...getFieldProps('remember')}/>
                Remember me
            </label>
            <Button type={'submit'} className={'login_btn'}>Login</Button>
        </fieldset>
    </form>
}