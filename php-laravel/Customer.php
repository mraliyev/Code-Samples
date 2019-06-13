<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class Customer extends Model
{

    /**
     * Adds or updates a customer
     *
     * @param $request
     * @return mixed
     */
    public function addOrUpdate(Request $request)
    {
        $procedure = !empty(static::where('code', $request->code)->first()) ? 'update_customer_info' : 'add_customer_info';

        try {
            \DB::select('call ' . $procedure . '(
                    "' . $request->first_name . '", 
                    "' . $request->last_name . '",
                    "' . $request->email . '",
                    "' . $request->code . '",
                    "' . $request->street . '",
                    "' . $request->city . '",
                    "' . $request->country . '"
            )');
            return response()->json(['message' => 'success']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'fail'], 422);
        }
    }

    /**
     * Remove specified customer
     *
     * @param $code
     * @return mixed
     */
    public function remove($code)
    {
        try {
            \DB::select('call remove_customer("' . $code . '")');
            return response()->json(['message' => 'success']);
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    /**
     * Get specified customer details
     *
     * @param $code
     * @return mixed
     */
    public function getDetails($code)
    {
        try {
            $detail = \DB::select('call get_customer("' . $code . '")');
            return response()->json($detail);
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }
}
