/**
 * File name: custom.js
 * Student's name: Chung Ping Mak
 * Student ID: 301281670
 * Date 9 Feb 2023
 */

$(window).on('load', () => { 
  $("#contactForm").submit((e) => {
    const lastname = $("#lastname").val();
    const firstname = $("#firstname").val();
    const email = $("#email").val();
    const tel = $("#tel").val();
    const content = $("#content").val();
    const type = $("#type").val();
    alert(`Hello ${firstname} ${lastname}! \n\nThank you for your subission. \nI'll contact you shortly.\n\nType: ${type} \nEmail: ${email} \nTel: ${tel} \nMessage: ${content} \n\nNow you will be redirected to home page`)
    window.location.assign('/');
    return false;
  })
});