<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subscriber extends Model
{
    protected $fillable = ['first_name', 'last_name', 'email', 'mailinglist_id'];

    public function mailinglists()
    {
        return $this->belongsToMany(Mailinglist::class)->withTimestamps();
    }

}