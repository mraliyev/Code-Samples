<?php

class Token
{
    /**
     * @var int
     */
    private static $tokenLength = 16;

    /**
     * @var string
     */
    const TOKEN_SESSION_KEY = '_token';

    /**
     * Return generated CSRF token
     *
     * @return string
     */
    public static function csrf()
    {
        return self::generate();
    }

    /**
     * Generate token
     *
     * @return string
     */
    private static function generate()
    {
        $token = bin2hex(openssl_random_pseudo_bytes(self::$tokenLength));
        self::setSessionToken(self::TOKEN_SESSION_KEY, $token);

        return $token;
    }

    /**
     * Saves token into the Session by the given key
     *
     * @param $key
     * @param $token
     */
    private static function setSessionToken($key, $token)
    {
        $_SESSION[$key] = $token;
    }

    /**
     * Validates token
     *
     * @param $token
     * @return bool|string
     */
    public static function validate($token)
    {
        if(!hash_equals(self::getSessionToken(), $token)){
            return false;
        }

        return self::unsetSessionToken();

    }

    /**
     * Removes token|key from the Session
     *
     * @param $key
     * @return bool|string
     */
    private static function unsetSessionToken($key = self::TOKEN_SESSION_KEY)
    {
        try{
            self::sessionKeyExists($key);
        }catch (\Exception $e){
            return $e->getMessage();
        }

        $_SESSION[$key] = null;
        unset($_SESSION[$key]);

        return true;
    }

    /**
     * Returns token from Session
     *
     * @param $key
     * @return string
     */
    public static function getSessionToken($key = self::TOKEN_SESSION_KEY)
    {
        try{
            self::sessionKeyExists($key);
        }catch (\Exception $e){
            return $e->getMessage();
        }

        return $_SESSION[$key];
    }

    /**
     * Checks if Session key exists
     *
     * @param $key
     * @return bool
     * @throws Exception
     */
    private static function sessionKeyExists($key)
    {
        if(empty($_SESSION[$key])){
            throw new \Exception("Session key $key doesn't exist");
        }

        return true;
    }

}

// Validate token
if($_SERVER['REQUEST_METHOD'] == "POST"){
    if(!Token::validate($_POST[Token::TOKEN_SESSION_KEY])){
        die('Token mismatch...');
    }
}
