<?php

namespace App\Http\Controllers;

use App\City;
use App\Country;
use App\Customer;
use App\CustomerView;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $countries = Country::all();
        $cities = City::all();

        return view('welcome', compact('countries', 'cities'));
    }

    /**
    * Fetch Customers from DB using MySQL view
    *
    * @return \Illuminate\Http\Response
    */
    public function fetchCustomers()
    {
        if(request()->ajax()){
            try{
                $customers = CustomerView::all();
                return response()->json($customers);
            } catch (\Exception $e){
                return $e->getMessage();
            }
        }
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param Customer $customer
     * @return \Illuminate\Http\Response
     */
    public function addCustomer(Request $request, Customer $customer)
    {
        if($request->ajax()){
            
            $this->validate($request, [
                'email' => 'required|unique:customers|max:255',
                // 'code' => 'required|unique:customers|max:12',
            ]);
            $request->merge(['code' => Str::random(12)]);
            return $customer->addOrUpdate($request);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \Illuminate\Http\Request $request
     * @param Customer $customer
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, Customer $customer)
    {
        if($request->ajax()){
            return $customer->getDetails($request->code);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param Customer $customer
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Customer $customer)
    {
        if($request->ajax()){
            $this->validate($request, [
                'email' => 'required|max:255',
                'code' => 'required|max:12',
            ]);
            return $customer->addOrUpdate($request);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param Customer $customer
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Customer $customer)
    {
        return $customer->remove($request->code);
    }
}
