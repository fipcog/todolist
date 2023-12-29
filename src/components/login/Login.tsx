import { FC } from "react";
import { Checkbox } from "../checkbox/Checkbox";
import { Button } from "../button/Button";
import './loginStyles.scss';


export const Login: FC = () => {
    return <form className="login_form" onSubmit={() => { }}>
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
            <div className="login_input_wrapper"><input type={'email'} placeholder="Email"/></div>
            <div className="login_input_wrapper"><input type={'password'} placeholder="Password"/></div>
            <label className="login_input_label"><Checkbox id={'login_form_remember_checkbox'} onChange={()=>{}}/>Remember me</label>
            <Button type={'submit'} className={'login_btn'}>Login</Button>
        </fieldset>
    </form>
}