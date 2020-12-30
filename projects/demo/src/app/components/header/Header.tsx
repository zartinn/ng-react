import { Component } from 'react';
import './Header.scss';
import logo from '@assets/logo.svg';
import { Link } from 'react-router-dom';
import { normalize, setColors } from '../../shared/utils';
import { routes } from '../../routes';


type HeaderProps = {};
type HeaderStates = { isDark: boolean };

export default class Header extends Component<HeaderProps, HeaderStates> {

  constructor(props: any) {
    super(props);
    this.state = { isDark: true };
    this.alternateColors = this.alternateColors.bind(this);
  }

  private links = routes.map((route, index) => <span key={index}><Link to={route.path}>{normalize(route.path)}</Link></span>);

  private alternateColors() {
    if (this.state.isDark) {
      setColors('#fff', '#000');
    } else {
      setColors('#000', '#fff');
    }
    this.setState(() => ({ isDark: !this.state.isDark }))
  }


  render() {
    return (
      <header>
        {this.links}
        <img src={logo} alt="logo"></img>
        <button onClick={this.alternateColors}>{this.state.isDark ? 'dark' : 'light'}</button>
      </header>
    );
  }
}