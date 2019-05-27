<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Listing;
use App\Category;
use App\ListingType;
use App\User;

class ListingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $listings = Listing::paginate(6);
        return view('listings.index', compact('listings'));
    }

    /**
     * Display user's own listings
     *
     * @return \Illuminate\Http\Response
     */
    public function showUserListings(Request $request)
    {
        $listings = $request->user()->listings()->get();
        return view('users.listings', compact('listings'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $categories = Category::all();
        $listingTypes = ListingType::all();
        return view('listings.create', compact('categories', 'listingTypes'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
          'title' => 'required|min:5|max:120',
          'category' => 'required|integer',
          'rate' => 'required|integer',
          'description' => 'required|min:50|max:200',
        ]);

        $listing = new Listing();
        $listing->title = $request['title'];
        $listing->category_id = $request['category'];
        $listing->rate = $request['rate'];
        $listing->description = $request['description'];

        $request->user()->listings()->save($listing);

        return redirect()->back()->with('info', 'Your listing has been created');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        $listing = Listing::find($id);
        $user = User::where('id', $listing->user_id)->first();
        $authenticatedUserId = $request->user() ? $request->user()->id : null;
        return view('listings.single', compact('listing', 'user', 'authenticatedUserId'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
