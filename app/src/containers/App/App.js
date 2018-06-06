import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'

import '../../assets/css/App.css'
import Header from '../../components/Header/Header.js'
import Sidebar from '../../components/Sidebar/Sidebar.js'
import Messenger from '../../views/Messenger/Messenger.js'
import Avatar from '../../views/Avatar/Avatar.js'

import appRoutes from 'routes/app.js'

const switchRoutes = (
  <Switch>
    {appRoutes.map((prop, key) => {
      if (prop.redirect) {
        return <Redirect from={prop.path} to={prop.to} key={key} />
      }
      return <Route path={prop.path} component={prop.component} key={key} exact />
    })}
  </Switch>
)

const styles = {}

class App extends Component {
  render () {
    return (
      <div className='app'>
        <CssBaseline />
        <Grid className='wrapper' container spacing={0} direction='row' alignItems='flex-start' justify='flex-start'>
          <Header routes={appRoutes} {...this.props} Avatar={Avatar} />
          <Sidebar routes={appRoutes} {...this.props} />
          <main className='container'>
            {switchRoutes}
          </main>
        </Grid>
        <Messenger />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    notification: state.notification,
    auth: state.auth,
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps, null)(withStyles(styles)(App))
