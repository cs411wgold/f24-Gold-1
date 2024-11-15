// tests/frontend/login.test.js
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const { JSDOM } = require('jsdom');

describe('Login Page', () => {
  let document;
  let window;

  beforeEach(() => {
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Login - KnowTime</title>
          <link rel="icon" type="image/x-icon" href="/resources/tomato.png">
          <link rel="stylesheet" href="login.css">
          <link rel="stylesheet" href="../styles.css">
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
          <script defer src="login.js"></script>
      </head>
      <body>
          <section class="bg-light py-3 py-md-3" style="--bs-bg-opacity: 0.80; margin-top:5%; margin-bottom:7%">
              <div class="container">
                <div class="row justify-content-center">
                  <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
                    <div class="card border border-light-subtle rounded-3 shadow-sm">
                      <div class="card-body p-3 p-md-4 p-xl-5">
                        <a href="../index.html" style="text-decoration: none; color: inherit;">
                          <div class="logo">
                              <span style="font-size: 40px; font-weight: bold;" class="card-title">KnowTime</span>
                              <img src="../resources/tomato.png" alt="tomato logo" style="width:60px; margin-bottom:20px;"> 
                          </div>
                        </a>
                        <h2 class="fs-6 fw-normal text-center text-secondary mb-4">Sign in to your account</h2>
                        <form action="#!">
                          <div class="row gy-2 overflow-hidden">
                            <div class="col-12">
                              <div class="form-floating mb-3">
                                <input type="text" class="form-control" name="email" id="email" placeholder="name@example.com" required>
                                <label for="email" class="form-label">Email</label>
                              </div>
                            </div>
                            <div class="col-12">
                              <div class="form-floating mb-3">
                                <input type="password" class="form-control" name="password" id="password" value="" placeholder="Password" required>
                                <label for="password" class="form-label">Password</label>
                              </div>
                            </div>
                            <div class="col-12">
                              <div class="d-flex gap-2 justify-content-between">
                                <div class="form-check">
                                  <input class="form-check-input" type="checkbox" value="" name="rememberMe" id="rememberMe">
                                  <label class="form-check-label text-secondary col-8" for="rememberMe">
                                    Keep me logged in
                                  </label>
                                </div>
                                <a href="../forgotpassword/forgotpassword.html" class="link-primary text-decoration-none">Forgot password?</a>
                              </div>
                            </div>
                            <div class="col-12">
                              <div class="d-grid my-3">
                                <button class="btn btn-primary btn-lg" id="testSubmit" type="submit">Log in</button>
                              </div>
                            </div>
                            <div class="col-12">
                              <p class="m-0 text-secondary text-center">Don't have an account? <a href="../signup/signup.html" class="link-primary text-decoration-none">Sign up</a></p>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
      </body>
      </html>
    `;
    const dom = new JSDOM(html, { runScripts: 'dangerously' });
    document = dom.window.document;
    window = dom.window;
    global.document = document;
    global.window = window;
  });

  test('should have a submit button with id "testSubmit"', () => {
    const testSubmit = document.getElementById('testSubmit');
    expect(testSubmit).not.toBeNull();
  });
});