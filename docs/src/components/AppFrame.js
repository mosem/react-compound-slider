// @flow

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import compose from 'recompose/compose'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import withWidth from 'material-ui/utils/withWidth'
import MenuIcon from 'material-ui-icons/Menu'
import LightbulbOutline from 'material-ui-icons/LightbulbOutline'
import Github from 'docs/src/components/Github'
import AppDrawer from 'docs/src/components/AppDrawer'

function getTitle(routes) {
  for (let i = routes.length - 1; i >= 0; i -= 1) {
    if (routes[i].hasOwnProperty('title')) {
      return routes[i].title
    }
  }

  return null
}

const styles = theme => ({
  '@global': {
    html: {
      boxSizing: 'border-box',
    },
    '*, *:before, *:after': {
      boxSizing: 'inherit',
    },
    body: {
      margin: 0,
      background: theme.palette.background.default,
      color: theme.palette.text.primary,
      lineHeight: '1.2',
      overflowX: 'hidden',
      WebkitFontSmoothing: 'antialiased', // Antialiasing.
      MozOsxFontSmoothing: 'grayscale', // Antialiasing.
    },
  },
  root: {
    display: 'flex',
    alignItems: 'stretch',
    minHeight: '100vh',
    width: '100%',
  },
  grow: {
    flex: '1 1 auto',
  },
  title: {
    marginLeft: 24,
    flex: '0 1 auto',
  },
  appBar: {
    transition: theme.transitions.create('width'),
  },
  appBarHome: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
  },
  [theme.breakpoints.up('lg')]: {
    drawer: {
      width: '250px',
    },
    appBarShift: {
      width: '100%',
    },
    navIconHide: {
      display: 'none',
    },
  },
})

class AppFrame extends Component {
  state = {
    drawerOpen: false,
  }

  handleDrawerClose = () => {
    this.setState({ drawerOpen: false })
  }

  handleDrawerToggle = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen })
  }

  handleToggleShade = () => {
    this.props.dispatch({ type: 'TOGGLE_THEME_SHADE' })
  }

  render() {
    const { children, routes } = this.props

    const classes = this.props.classes
    const title = getTitle(routes)

    // let drawerDocked = isWidthUp('lg', width)
    const navIconClassName = ''
    let appBarClassName = classes.appBar

    if (title === null) {
      // home route, don't shift app bar or dock drawer
      // drawerDocked = false
      // appBarClassName += ` ${classes.appBarHome}`
    } else {
      // navIconClassName += ` ${classes.navIconHide}`
      appBarClassName += ` ${classes.appBarShift}`
    }

    return (
      <div className={classes.root}>
        <AppBar className={appBarClassName}>
          <Toolbar>
            <IconButton
              color="default"
              aria-label="open drawer"
              onClick={this.handleDrawerToggle}
              className={navIconClassName}
            >
              <MenuIcon />
            </IconButton>
            {title !== null && (
              <Typography
                className={classes.title}
                type="title"
                color="inherit"
                noWrap
              >
                {title}
              </Typography>
            )}
            <div className={classes.grow} />
            <IconButton
              title="Toggle light/dark theme"
              color="default"
              aria-label="change theme"
              onClick={this.handleToggleShade}
            >
              <LightbulbOutline />
            </IconButton>
            <IconButton
              component="a"
              title="GitHub"
              color="default"
              href="https://github.com/sghall/react-compound-slider"
            >
              <Github />
            </IconButton>
          </Toolbar>
        </AppBar>
        <AppDrawer
          className={classes.drawer}
          routes={routes}
          onClose={this.handleDrawerClose}
          open={this.state.drawerOpen}
        />
        {children}
      </div>
    )
  }
}

AppFrame.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  routes: PropTypes.array.isRequired,
}

export default compose(
  withStyles(styles, {
    name: 'AppFrame',
  }),
  withWidth(),
  connect(),
)(AppFrame)
