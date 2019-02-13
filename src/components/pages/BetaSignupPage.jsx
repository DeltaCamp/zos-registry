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
      projectName: '',
      companyName: '',
      email: '',
      budget: '',
      hearAboutUs: '',
      comments: ''
    }
  }

  submit = (e) => {
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

    const url = 'https://script.google.com/macros/s/AKfycby1cKI5HlVcwx8uR0XB4w68SULY2v5dVSbI2lj4BQKBA1HudJ8/exec'

    this.setState({ isLoading: true })

    fetch(`${url}?${JSON.stringify(this.state)}`)
      .then(() => {
        this.setState({
          emailSent: true
        })
      })
      .catch((error) => {
        console.error(error)
        this.setState({
          wasError: error
        })
      })
  }

  handleBudgetChanged = (e) => {
    this.setState({
      budget: e.currentTarget.value
    })
  }

  render () {
    var content, error

    if (this.state.wasError) {
      error =
        <section className='hero is-small is-danger has-text-centered first'>
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
        <section className='hero is-medium is-primary has-text-centered'>
          <div className='hero-body'>
            <h1 className='title'>
              Thank you!
            </h1>
            <h2 className='subtitle'>
              We'll be in contact shortly.
            </h2>
          </div>
        </section>
    } else {
      content =
        <form onSubmit={this.submit} className='form'>

          <div className='field'>
            <label className='label' htmlFor='contact-email-input'>
              What is your email address? <span className='has-text-info'>*</span>
            </label>
            <div className='control'>
              <input
                id='contact-email-input'
                className='input'
                type='text'
                name='email'
                pattern='^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$'
                value={this.state.email}
                onChange={(e) => this.setState({ email: e.target.value })}
              />
            </div>

            {this.state.emailError ? (
              <label className='hint has-text-danger is-attention-grabby'>
                Please enter an email address which we can reach you at
              </label>
            ) : null}
          </div>

          <div className='field'>
            <label className='label' htmlFor='contact-name-input'>
              What is your name?
            </label>
            <div className='control'>
              <input id='contact-name-input' className='input' type='text' name='name'
                value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })}
              />
            </div>
          </div>

          <div className='field'>
            <label className='label' htmlFor='contact-project-name-input'>
            What is your project or organization name?
            </label>
            <div className='control'>
              <input
                autoFocus
                id='contact-project-name-input'
                className='input'
                type='text'
                name='companyProjectName'
                value={this.state.projectName}
                onChange={(e) => this.setState({ projectName: e.target.value })}
              />
            </div>
          </div>

          <div className='field'>
            <label className='label'>
            What is your budget?
            </label>

            <div className='control'>
              <label className='radio'>
                <input
                  type='radio'
                  value='Less than $25,000'
                  name='budget'
                  onChange={this.handleBudgetChanged}
                />
                <span className='radio-label'>Less than $25,000</span>
              </label>

              <label className='radio'>
                <input
                  type='radio'
                  value='$25,000 to $50,000'
                  name='budget'
                  onChange={this.handleBudgetChanged}
                />
                <span className='radio-label'>$25,000 to $50,000</span>
              </label>

              <label className='radio'>
                <input
                  type='radio'
                  value='$50,000 to $100,000'
                  name='budget'
                  onChange={this.handleBudgetChanged}
                />
                <span className='radio-label'>$50,000 to $100,000</span>
              </label>

              <label className='radio'>
                <input
                  type='radio'
                  value='$100,000 or more'
                  name='budget'
                  onChange={this.handleBudgetChanged}
                />
                <span className='radio-label'>$100,000 or more</span>
              </label>

              <label className='radio'>
                <input
                  type='radio'
                  value='Currently uncertain'
                  name='budget'
                  onChange={this.handleBudgetChanged}
                />
                <span className='radio-label'>Currently uncertain</span>
              </label>
            </div>
          </div>

          <div className='field'>
            <label className='label' htmlFor='contact-hearAboutUs-input'>
            How did you hear about Delta Camp?
            </label>
            <div className='control'>
              <input id='contact-hearAboutUs-input' className='input' type='text' name='hearAboutUs'
                value={this.state.hearAboutUs} onChange={(e) => this.setState({ hearAboutUs: e.target.value })}
              />
            </div>
          </div>

          <div className='field'>
            <label className='label' htmlFor='contact-comments-textarea'>
            Additional Comment(s):
            </label>
            <div className='control'>
              <textarea
                id='contact-comments-textarea'
                className='textarea'
                type='text'
                name='Name'
                rows='5'
                value={this.state.comments}
                onChange={(e) => this.setState({ comments: e.target.value })}
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
