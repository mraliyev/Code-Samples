<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Mailinglist extends Model
{
    protected $fillable = ['name', 'description'];

    public function subscribers()
    {
        return $this->belongsToMany(Subscriber::class)->withTimestamps();
    }

    public function subscribe(array $attributes)
    {
        if(empty($subscriber = Subscriber::where($attributes)->first())){
            $subscriber = Subscriber::create($attributes);
        }

        $id = $subscriber->getKey();

        if ($this->existsInPivot($id)) {
            return ["status" => "success", "message" => "$subscriber->email is already in the $this->name list."];
        }

        $this->subscribers()->attach($id);
        return ["status" => "success", "message" => "$subscriber->email has been subscribed to $this->name."];
    }

    public function existsInPivot($id)
    {
        return $this->subscribers->contains($id);
    }

}