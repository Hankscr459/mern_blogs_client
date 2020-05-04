import { useState, useEffect } from 'react'
import { APP_NAME } from '../config'
import Link from 'next/link'
import NProgress from 'nprogress'
import Router from 'next/router'
import { signout, isAuth } from '../actions/auth'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap'
import Search from '../components/blog/search'

Router.onRouteChangeStart = url => NProgress.start()
Router.onRouteChangeComplete = url => NProgress.done()
Router.onRouteChangeError = url => NProgress.done()

const Header = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [authenticated, setAuthenticated] = useState(false)

    useEffect(() => {
      setAuthenticated(isAuth())
    }, [])

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div>
          <Navbar color="light" light expand="md">
            <Link href="/">
              <NavLink className="font-weight-bold pointer">{APP_NAME}</NavLink>
            </Link>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <>
                  <NavItem>
                    <Link href="/blogs">
                      <NavLink className='pointer'>Blogs</NavLink>
                    </Link>
                  </NavItem>
                  <NavItem>
                    <Link href="/contact">
                      <NavLink className='pointer'>Contact</NavLink>
                    </Link>
                  </NavItem>
                </>
                {authenticated && isAuth().role == 0 && (
                  <NavItem>
                    <Link href='/user'>
                      <NavLink  className='pointer'>{`${isAuth().name}'s Dashboard`}</NavLink>
                    </Link>
                  </NavItem>
                )}
                {authenticated && isAuth().role == 1 && (
                  <NavItem>
                    <Link href='/admin'>
                      <NavLink className='pointer'>{`${isAuth().name}'s Dashboard`}</NavLink>
                    </Link>
                  </NavItem>
                )}
                {authenticated ? (
                    <>
                    <NavItem>
                      <NavLink className='pointer' onClick={() => signout(() => Router.replace(`/signin`))}>Signout</NavLink>
                    </NavItem>
                    <NavItem>
                      <Link href="/user/crud/blog">
                          <NavLink className='btn btn-primary text-light pointer'>Write a blog</NavLink>
                      </Link>
                    </NavItem>
                    </>
                  ) : (
                    <>
                      <NavItem>
                        <Link href="/signup">
                          <NavLink className='pointer'>Signup</NavLink>
                        </Link>
                      </NavItem>
                      <NavItem>
                        <Link href="/signin">
                          <NavLink className='pointer'>Signin</NavLink>
                        </Link>
                      </NavItem>
                    </>
                  )
                }
              </Nav>
            </Collapse>
          </Navbar>
          <Search />
        </div>
    )
}

export default Header;