/*
	File info.
	-	Keeps notes of things to include in the project.
*/

/*
	This is a list of items TODO and implement at some point

	Tumblr API:	Blog Iterator
		Gathers post data iteratively until reaching some point
		Would like to implement data structure for the Iterator to use

	Pinterest API: Image Indexer
		Finds images related to a given image and adds them to a table
		Index will penetrate an image's relative depth to some number n.

	Pixiv.net API:
		Identify posts by User ID
		Import profile
		Find related images
		Find related artists
		Define criteria for finding related media

	Twitter API: Media Iterator
		Similar to previous models, the system will iterate throuh a given Twitter profile
		Media sources will be extrapolated from the source
		-	Data manipulation may be necessary, such as handling Blob URLs and parsing Base64 data streams.
		A feature that can be added which will index the followers of a profile, if that data is available

	ImageBoard API:
		Danbooru
		Yande.re
		-	Search for an online list of image boards to choose from
		Dynamic host selection
		Keyword search
		-	Tickbox-Selectable search operators which conform to each host's syntax
		-	-	Such as the ability to search for posts "before" a certain post ID or date
		HTML interface
		
Many of these options overlap other API database functions, and if possible I will try to implement them
*/
