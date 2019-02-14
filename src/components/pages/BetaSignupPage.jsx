import React, { PureComponent } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { ScrollToTop } from '~/components/ScrollToTop'
import { FooterContainer } from '~/components/layout/Footer'

export const BetaSignupPage = class _BetaSignupPage extends PureComponent {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      email: '',
      name: '',
      projectName: '',
      githubUsername: '',
      country: '',
      participate: '',
      participateOther: '',
      questions: '',
      hearAbout: '',
      additionalInfo: ''
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    
    this.setState({
      emailError: false
    })

    if (this.state.email === '') {
      this.setState({
        emailError: true
      })
      return
    }

    // const url = 'https://script.google.com/macros/s/AKfycby1cKI5HlVcwx8uR0XB4w68SULY2v5dVSbI2lj4BQKBA1HudJ8/exec'
    console.log(this.state)

    this.setState({ isLoading: true })
    this.setState({ emailSent: true })
    // this.setState({ wasError: 'There was an error' })


    // fetch(`${url}?${JSON.stringify(this.state)}`)
    //   .then(() => {
    //     this.setState({
    //       emailSent: true
    //     })
    //   })
    //   .catch((error) => {
    //     console.error(error)
    //     this.setState({
    //       wasError: error
    //     })
    //   })
  }

  handleParticipateChanged = (e) => {
    this.setState({
      participate: e.currentTarget.value
    })
  }

  render () {
    var content, error

    if (this.state.wasError) {
      error =
        <section className='hero is-medium is-dark has-text-centered first'>
          <ScrollToTop />
          <div className='hero-body'>
            <h1 className='title'>
              An Error Occurred
            </h1>
            <h2 className='subtitle'>
              Try again later!
            </h2>
          </div>
        </section>
    }

    if (this.state.emailSent) {
      content =
        <div className='hero is-dark is-medium has-text-centered'>
          <ScrollToTop />
          <div className='hero-body'>
            <h1 className='is-size-1 is-monospaced is-uppercase'>
              Thank you!
            </h1>
            <h3 className='is-size-3'>
              We'll be in contact shortly.
            </h3>
          </div>
        </div>
    } else {
      content =
        <form onSubmit={this.handleSubmit} className='form'>
          <div className='field'>
            <label className='label' htmlFor='email-input'>
              What is your email address? <span className='has-text-info'>*</span>
            </label>
            <div className='control'>
              <input
                autoFocus
                id='email-input'
                className='input'
                type='text'
                name='email'
                pattern='^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$'
                value={this.state.email}
                onChange={(e) => this.setState({ email: e.target.value })}
              />
            </div>

            {this.state.emailError && (
              <>
                <ScrollToTop />
                <label className='hint has-text-danger is-attention-grabby'>
                  Please enter an email address which we can reach you at
                </label>
              </>
            )}
          </div>

          <div className='field'>
            <label className='label' htmlFor='name-input'>
              What is your name? <span className='has-text-info'>*</span>
            </label>
            <div className='control'>
              <input
                id='name-input'
                className='input'
                type='text'
                name='name'
                value={this.state.name}
                onChange={(e) => this.setState({ name: e.target.value })}
              />
            </div>
          </div>

          <div className='field'>
            <label className='label' htmlFor='project-name-input'>
              What is your project or organization name? <span className='has-text-info'>*</span>
            </label>
            <div className='control'>
              <input
                id='project-name-input'
                className='input'
                type='text'
                name='projectName'
                value={this.state.projectName}
                onChange={(e) => this.setState({ projectName: e.target.value })}
              />
            </div>
          </div>

          <div className='field'>
            <label className='label' htmlFor='github-username-input'>
              What is your GitHub username?
            </label>
            <div className='control'>
              <input
                id='github-username-input'
                className='input'
                type='text'
                name='githubUsername'
                value={this.state.githubUsername}
                onChange={(e) => this.setState({ githubUsername: e.target.value })}
              />
            </div>
          </div>

          <div className='field'>
            <label className='label'>
              Which country do you live in? <span className='has-text-info'>*</span>
            </label>

            <div className='control'>
              <select
                id='country-input'
                className='input'
                name='country'
                value={this.state.country}
                onChange={(e) => this.setState({ country: e.target.value })}
              >
                <option>Hi</option>
              </select>
            </div>
          </div>

          <div className='field'>
            <label className='label'>
              How do you want to participate in the private beta? <span className='has-text-info'>*</span>
            </label>

            <div className='control'>
              <label className='radio'>
                <input
                  type='radio'
                  value='Developing and maintaining an EVM package'
                  name='participate'
                  onChange={this.handleParticipateChanged}
                />
                <span className='radio-label'>Developing and maintaining an EVM package</span>
              </label>

              <label className='radio'>
                <input
                  type='radio'
                  value='Reviewing EVM packages code and vouching ZEP Tokens for them'
                  name='participate'
                  onChange={this.handleParticipateChanged}
                />
                <span className='radio-label'>Reviewing EVM packages code and vouching ZEP Tokens for them</span>
              </label>

              <label className='radio'>
                <input
                  type='radio'
                  value='Developing my own project using EVM packages'
                  name='participate'
                  onChange={this.handleParticipateChanged}
                />
                <span className='radio-label'>Developing my own project using EVM packages</span>
              </label>

              <label className='radio'>
                <input
                  type='radio'
                  value='Other'
                  name='participate'
                  onChange={this.handleParticipateChanged}
                />
                <span className='radio-label is-short'>Other:</span>
              </label>
              <input
                id='participateOther-input'
                className='input radio-label__other-input'
                type='text'
                name='participateOther'
                value={this.state.participateOther}
                onChange={(e) => this.setState({ participateOther: e.target.value })}
              />
            </div>
          </div>

          <div className='field'>
            <label className='label' htmlFor='questions-input'>
              What questions do you have about ZeppelinOS before joining the private beta?
            </label>
            <div className='control'>
              <input
                id='questions-input'
                className='input'
                type='text'
                name='questions'
                value={this.state.questions}
                onChange={(e) => this.setState({ questions: e.target.value })}
              />
            </div>
          </div>

          <div className='field'>
            <label className='label' htmlFor='hearAbout-input'>
              How did you hear about ZeppelinOS?
            </label>
            <div className='control'>
              <input
                id='hearAbout-input'
                className='input'
                type='text'
                name='hearAbout'
                value={this.state.hearAbout}
                onChange={(e) => this.setState({ hearAbout: e.target.value })}
              />
            </div>
          </div>

          <div className='field'>
            <label className='label' htmlFor='additionalInfo-textarea'>
              Is there anything else we should know about you?
            </label>
            <div className='control'>
              <textarea
                id='additionalInfo-textarea'
                className='textarea'
                type='text'
                name='Name'
                rows='5'
                value={this.state.additionalInfo}
                onChange={(e) => this.setState({ additionalInfo: e.target.value })}
              />
            </div>
          </div>

          <div className='field is-pulled-right'>
            <div className='control'>
              <button
                type='submit'
                className={classnames('button is-pill is-purple is-monospaced', {
                  'is-loading': this.state.isLoading
                })}
              >Submit</button>
            </div>
          </div>
        </form>
    }

    return (
      <div className='is-positioned-absolutely'>
        <Helmet
          title='Beta - Sign Up'
        />

        <ScrollToTop />

        <section className='section section--main-content'>
          <div className='container'>
            <div className='row'>
              <div className='col-xs-12'>
                <button
                  onClick={this.context.router.history.goBack}
                  className='button is-monospaced is-text has-text-weight-bold back-button has-underline-border'
                >
                  {'<'} Back
                </button>

                <br />
                <br />

                <h2 className='is-size-2'>
                  Sign up for the Zeppelin Registry Beta
                </h2>

                <br />
                {error}
                {content}
              </div>
            </div>
          </div>
        </section>

        <FooterContainer />
      </div>
    )
  }
}
