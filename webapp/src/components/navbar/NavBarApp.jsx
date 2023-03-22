import { Menu } from 'antd';
import { Link } from "react-router-dom"
import { SnippetsOutlined , LoginOutlined, QuestionOutlined} from '@ant-design/icons';
import './NavBarApp.css'



function NavBarApp () {
    return (

        <Menu theme="dark" selectable={false} mode="horizontal" items={ [
            { key:"logo",  label: <Link to="/"> <img src="logo.png" alt="KeywordsApp" /></Link>},
            { key:"menuDoc",  label: <Link to="/doc">Documentación</Link>, icon : <SnippetsOutlined />},
            { key:"menuAbout",  label: <Link to="/about">Sobre mí</Link>, icon : <QuestionOutlined />},
            { key:"menuLogin",  label: <Link to="/login">Inicia sesión</Link>, icon: <LoginOutlined />},
            { key:"menuSignin",  label: <Link to="/sign">Registro</Link>},
  
            ]}
            style={{ height: 64}}>
        </Menu>
    )
}

export default NavBarApp