/**
 * File name: custom.js
 * Student's name: Chung Ping Mak
 * Student ID: 301281670
 * Date 9 Feb 2023
 */

$(window).on('load', () => {
  // override the default alert method
  const alert = (message, type, placeholderId = "liveAlertPlaceholder") => {
    const alertPlaceholder = document.getElementById(placeholderId)
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      '</div>'
    ].join('')
    alertPlaceholder.append(wrapper)
  }

  // contact form
  $("#contactForm").submit((event) => {
    const lastname = $("#lastname").val();
    const firstname = $("#firstname").val();
    const email = $("#email").val();
    const tel = $("#tel").val();
    const content = $("#content").val();
    const type = $("#type").val();
    alert(`Hello ${firstname} ${lastname}! \n\nThank you for your subission. \nI'll contact you shortly.\n\nType: ${type} \nEmail: ${email} \nTel: ${tel} \nMessage: ${content} \n\nNow you will be redirected to home page`, "info")
    window.location.assign('/');
    return false;
  })

  // logout button
  $(".logout-btn").click((event) => {
    event.preventDefault();
    $(".logout-btn").addClass("disabled");
    $(".logout-btn > .spinner-border").removeClass("d-none")
    $.ajax({
      type: "POST",
      url: "/api/logout",
      data: {}
    }).done((_) => {
      // add alert
      alert('You have logout successfully. You will be redirected to the home page', 'success', 'liveAlertPlaceholder')
      setTimeout(function () {
        window.location.href = '/';
      }, 1000);
    }).fail((error) => {
      alert(error?.responseJSON?.error || "Unknown Error", 'danger', 'liveAlertPlaceholder')
    }).always(() => {
      // change the button loading to normal
      $(".logout-btn").removeClass("disabled");
      $(".logout-btn > .spinner-border").addClass("d-none")
    });
  });

  // register form
  $("#signupForm").submit((event) => {
    event.preventDefault();
    const username = $("#signupForm #username").val().trim()
    const password = $("#signupForm #password").val().trim()
    if (username == "" == password != "") {
      alert("The username and password cannot be blank", "info", "registerAlertPlaceholder")
    } else if (!username.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      alert("Incorrect email format for username")
    } else if (password.length < 8) {
      alert("The password should be at least 8 characters", "info", "registerAlertPlaceholder")
    } else {
      // change the button normal to loading, prevent multiple clicks
      $(".btn-submit").addClass("disabled");
      $(".btn-submit > .spinner-border").removeClass("d-none")
      $.ajax({
        type: "POST",
        url: "/api/signup",
        data: {
          username: username,
          password: password
        }
      }).done((_) => {
        // remove modal
        $('#registerModal').modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
        // add alert
        alert('You have signup successfully. You will be redirected to the dashboard page', 'success', 'registerAlertPlaceholder')
        setTimeout(function () {
          window.location.href = '/dashboard';
        }, 1000);
      }).fail((error) => {
        alert(error?.responseJSON?.error || "Unknown Error", 'danger', 'registerAlertPlaceholder')
      }).always(() => {
        // change the button loading to normal
        $(".btn-submit").removeClass("disabled");
        $(".btn-submit > .spinner-border").addClass("d-none")
      });
    }
  });

  // login form
  $("#loginForm").submit((event) => {
    event.preventDefault();
    const username = $("#loginForm #username").val().trim()
    const password = $("#loginForm #password").val().trim()
    if (username == "" == password != "") {
      alert("The username and password cannot be blank", "info", "loginAlertPlaceholder")
    } else if (!username.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      alert("Incorrect email format for username", "info", "loginAlertPlaceholder")
    } else if (password.length < 8) {
      alert("The password should be at least 8 characters", "info", "loginAlertPlaceholder")
    } else {
      // change the button normal to loading, prevent multiple clicks
      $(".btn-submit").addClass("disabled");
      $(".btn-submit > .spinner-border").removeClass("d-none")
      $.ajax({
        type: "POST",
        url: "/api/login",
        data: {
          username: username,
          password: password
        }
      }).done((_) => {
        // remove modal
        $('#loginModal').modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
        // add alert
        alert('You have logged in successfully. It will be redirected to dashboard in 1 second', 'success', 'loginAlertPlaceholder')
        setTimeout(function () {
          window.location.href = '/dashboard';
        }, 1000);
      }).fail((error) => {
        alert(error?.responseJSON?.error || "Unknown Error", 'danger', 'loginAlertPlaceholder')
      }).always(() => {
        // change the button loading to normal
        $(".btn-submit").removeClass("disabled");
        $(".btn-submit > .spinner-border").addClass("d-none")
      });
    }
  });

  // business contact modal 
  $('#businessContactModal').on('show.bs.modal', (event) => {
    const button = $(event.relatedTarget);
    const contactName = button.data('name');
    const contactNumber = button.data('number');
    const email = button.data('email');
    const id = button.data('id');
    $('#businessContactModal #contactName').val(contactName);
    $('#businessContactModal #contactNumber').val(contactNumber);
    $('#businessContactModal #email').val(email);
    $('#businessContactModal #id').val(id);
    $('#businessContactModal #business-contact-button').text((!contactName && !contactNumber && !email && !id) ? "Create" : "Edit");
  });


  // business contact modal 
  $('#businessContactDeleteModal').on('show.bs.modal', (event) => {
    const button = $(event.relatedTarget);
    const id = button.data('id');
    $('#businessContactDeleteModal #id').val(id);
  });

  // business contact edit form
  $("#businessContactForm").submit((event) => {
    event.preventDefault();
    const contactName = $("#businessContactForm #contactName").val().trim()
    const contactNumber = $("#businessContactForm #contactNumber").val().trim()
    const email = $("#businessContactForm #email").val().trim()
    const id = $("#businessContactForm #id").val().trim()
    if (contactName == "" || contactNumber == "" || email == "") {
      alert("All the fields are required", "info", "businessContactAlertPlaceholder")
    } else if (!email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      alert("Incorrect email format", "info", "businessContactAlertPlaceholder")
    } else {
      // change the button normal to loading, prevent multiple clicks
      $(".btn-submit").addClass("disabled");
      $(".btn-submit > .spinner-border").removeClass("d-none")
      $.ajax({
        type: "POST",
        url: "/api/contact",
        data: {
          contactName: contactName,
          contactNumber: contactNumber,
          email: email,
          id: id
        }
      }).done((_) => {
        // remove modal
        $('#businessContactModal').modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
        // add alert
        alert('Saved successfully', 'success', 'businessContactAlertPlaceholder')
        setTimeout(() => {
          location.reload();
        }, 1000)
      }).fail((error) => {
        alert(error?.responseJSON?.error || "Unknown Error", 'danger', 'businessContactAlertPlaceholder')
      }).always(() => {
        // change the button loading to normal
        $(".btn-submit").removeClass("disabled");
        $(".btn-submit > .spinner-border").addClass("d-none")
      });
    }
  });

  // business contact delete form
  $("#businessContactDeleteForm").submit((event) => {
    event.preventDefault();
    const id = $("#businessContactDeleteForm #id").val().trim()
    if (id == "") {
      alert("All the fields are required", "info", "businessContactDeleteAlertPlaceholder")
    } else {
      // change the button normal to loading, prevent multiple clicks
      $(".btn-submit").addClass("disabled");
      $(".btn-submit > .spinner-border").removeClass("d-none")
      $.ajax({
        type: "DELETE",
        url: "/api/contact",
        data: {
          id: id
        }
      }).done((_) => {
        // remove modal
        $('#businessContactDeleteModal').modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
        // add alert
        alert('Saved successfully', 'success', 'businessContactDeleteAlertPlaceholder')
        setTimeout(() => {
          location.reload();
        }, 1000)
      }).fail((error) => {
        alert(error?.responseJSON?.error || "Unknown Error", 'danger', 'businessContactDeleteAlertPlaceholder')
      }).always(() => {
        // change the button loading to normal
        $(".btn-submit").removeClass("disabled");
        $(".btn-submit > .spinner-border").addClass("d-none")
      });
    }
  });
});