import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import injectSaga from 'utils/injectSaga'
import injectReducer from 'utils/injectReducer'
import { createStructuredSelector } from 'reselect'
import PropTypes from 'prop-types'

import { getNews } from './actions'
import saga from './saga'
import reducer from './reducer'
import { selectHomeNews } from './selectors'
import styles from './style.css'

class HomePage extends Component {
  state = {
    tabid: 'ask'
  }

  componentDidMount () {
    this.props.getNews({
      tab: this.state.tabid,
      limit: 6,
      page: 1
    })
  }

  renderListBox (res) {
    if (res && res.length) {
      return res.map(item => (
        <section key={item.id} className={styles.msgBox}>
          <span><img src={item.author.avatar_url} /></span>
          <article>
            <p><b>标题:</b> {item.title}</p>
            <p><b>发表日期:</b> {Date(item.create_at)}</p>
          </article>
        </section>
      ))
    } else {
      return null
    }
  }

  selectTab (tabid = 'ask') {
    const that = this
    this.setState({
      ...this.state,
      tabid
    }, () => {
      that.props.getNews({
        tab: that.state.tabid,
        limit: 6,
        page: 1
      })
    })
  }

  render () {
    const { homeNews } = this.props

    return (
      <div style={{ padding: '10px 0' }}>
        <div className={styles.tabs}>
          <span className={this.state.tabid === 'ask' && styles.actived} data-tab="ask" onClick={() => this.selectTab('ask')}>ask</span>
          <span className={this.state.tabid === 'share' && styles.actived} data-tab="share" onClick={() => this.selectTab('share')}>share</span>
          <span className={this.state.tabid === 'job' && styles.actived} data-tab="job" onClick={() => this.selectTab('job')}>job</span>
          <span className={this.state.tabid === 'good' && styles.actived} data-tab="good" onClick={() => this.selectTab('good')}>good</span>
        </div>
        {homeNews.isRequest
          ? (<div>loading...</div>)
          : this.renderListBox(homeNews.data)
        }
        <div className={styles.test}>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    getNews: (val) => {
      return dispatch(getNews(val))
    }
  }
}

const mapStateToProps = createStructuredSelector({
  homeNews: selectHomeNews()
})

const withSaga = injectSaga({ key: 'homePage', saga })
const withReducer = injectReducer({ key: 'homePage', reducer })
const withConnect = connect(mapStateToProps, mapDispatchToProps)

// containers propsTypes
HomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  getNews: PropTypes.func,
  homeNews: PropTypes.object.isRequired
}

export default compose(withReducer, withSaga, withConnect)(HomePage)
