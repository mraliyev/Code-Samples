<?php
/**
 *  This file is intended for helper functions that are global to the App.
 */

/**
 * Returns Client IP Address
 *
 * @return string
 */
function getClientIp()
{

    $ipaddress = '';

    if ($_SERVER['HTTP_CLIENT_IP']) {
        $ipaddress = $_SERVER['HTTP_CLIENT_IP'];
    } else if ($_SERVER['HTTP_X_FORWARDED_FOR']) {
        $ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
    } else if ($_SERVER['HTTP_X_FORWARDED']) {
        $ipaddress = $_SERVER['HTTP_X_FORWARDED'];
    } else if ($_SERVER['HTTP_FORWARDED_FOR']) {
        $ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
    } else if ($_SERVER['HTTP_FORWARDED']) {
        $ipaddress = $_SERVER['HTTP_FORWARDED'];
    } else if ($_SERVER['REMOTE_ADDR']) {
        $ipaddress = $_SERVER['REMOTE_ADDR'];
    }

    return $ipaddress;

}

/**
 * Split URI
 *
 * @return array
 */
function splitUri()
{
    return explode('/', $_SERVER['REQUEST_URI']);

}

/**
 * Get/Set Session
 *
 * @param $key
 * @param null $value
 * @return mixed
 */
function session($key, $value = null)
{
    if (empty($value) && sessionKeyExists($key)) {
        return $_SESSION[$key];
    }

    $_SESSION[$key] = $value;
    return $_SESSION[$key];
}

/**
 * Check if key exists in session
 *
 * @param $key
 * @return bool
 */
function sessionKeyExists($key)
{
    return empty($_SESSION[$key]);
}

/**
 * Removes session data / session key
 *
 * @param null $key
 * @return array|void
 */
function clearSession($key = null)
{
    if (!empty($key)) {
        $_SESSION[$key] = null;
        unset($_SESSION[$key]);
        return;
    }

    return $_SESSION = [];
}

/**
 *  Logout a user
 */
function logout()
{
    clearSession();
    return header("location:login.php");
}
