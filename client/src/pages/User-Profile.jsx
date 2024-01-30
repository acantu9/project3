import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import '../styles/ProfilePage.css';
import Auth from '../utils/auth';

import React from "react";
import ReactDOM from "react-dom";
import Button from "react-bootstrap/Button";
import { IoPersonCircleOutline } from "react-icons/io5";

function user_profile() {
    const user = 'Profile' //Replace with Users profile info
    const favorites = 'favorites-btn' 
    //const donate = 'donate-btn'
    //const quiz = 'take-quiz'



return(
<main>
{/* User Profile Card */}
<div class="card mb-3" style= {{maxWidth:"540px", backgroundColor:"#050038", borderstyle:"solid", borderWidth:"3px", borderColor:"Black"}}> 
  <div class="row g-0">
    <div class="col-md-4">
    <IoPersonCircleOutline size="200px"/>
{/* User Icon */}
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h4 class="card-type" >Profile</h4>
        <h5 class="card-user">User Placeholder</h5>
        <p class="card-text"> User email placeholder </p>
      </div>
    </div>
  </div>
</div>
{/* Quiz Button */}
<div> 
  <Link className='quiz-button btn btn-primary' to="/Search">Find Pet{/**fix link */}</Link>
</div>
</main>
);
}

export default user_profile