# Pintsize
Sass front end template


##Get started
It's easy to get started. Just follow the steps below.


###1.Download

Download Pintsize or clone the repo

	$ git clone https://github.com/alistairtweedie/pintsize.git


###2. Install

Run Node Package Manager

	$ npm install


###3. Configure

Enter the pixel grid values used in your artwork in _variables.scss file. Done!

	$columns: 12;
    $column-width: 65px;
    $gutter-width: 20px;


###4. Build

Run Gulp

	$ gulp


##Basic usage

This is the default usage. The grid is calculated and classes are genrated for you to get building quickly.

	<div class="section">
 
        <div class="container">
 
            <div class="row">
                
                <div class="col w-6">
                    
                    A column with a width of 6 columns
 
                </div>
 
                <div class="col w-4 p-2">
                    
                    A column with a width of 4 columns
                    And pushed from the left a width of 2 columns
 
                </div>
 
            </div>
            
        </div>

	</div>


##Advanced usage

By setting the $advanced-usage variable in _variables.scss to 'true' you can work with Pintsize more semantically.

	//based on a 12 column grid
 
	.main-page-content {
	    
	    max-width: $grid-width; // calulated from your grid variables
	    margin: 0 auto;
	    padding: 0 1em;
	    @include clearfix;
	    
	}
	 
	.main-article {
	    
	    //default is 100% width on small devices
	    
	    //for devices larger than 640px
	    @include break-at(640px){
	        
	        @include columns(8);
	        
	    }
	    
	}
	 
	.popular-articles {
	    
	    //default is 100% width on small devices
	    
	    //for devices larger than 640px
	    @include break-at(640px) {
	        
	        @include columns(6, omega); // omega is used to remove the margin-right
	        
	    }
	    
	}	

	    	

 
## License

The MIT License (MIT)

Copyright (c) 2014 @alistairtweedie

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
