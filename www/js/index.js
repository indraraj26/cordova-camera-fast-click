/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */


var app = {
	// Application Constructor
	initialize: function () {
		document.addEventListener(
			'deviceready',
			this.onDeviceReady.bind(this),
			false,
		);
	},

	// deviceready Event Handler
	//
	// Bind any cordova events here. Common events are:
	// 'pause', 'resume', etc.
	onDeviceReady: function () {
		this.receivedEvent('deviceready');
	},

	// Update DOM on a Received Event
	receivedEvent: function (id) {
		var parentElement = document.getElementById(id);
		var listeningElement = parentElement.querySelector('.listening');
		var receivedElement = parentElement.querySelector('.received');
		var cameraClick = document
			.getElementById('take-picture')
			.addEventListener('click', app.takePhoto);
		console.log(cameraClick, 'camera');
		listeningElement.setAttribute('style', 'display:none;');
		receivedElement.setAttribute('style', 'display:block;');
		console.log('Received Event: ' + id);
	},
	takePhoto: function () {
		  navigator.camera.getPicture(
			(file) => {
				console.log(file, 'camera file');
				if (file.indexOf("content://") > -1) {
					console.log("content //", file);
					window.FilePath.resolveNativePath(file, (success) => {
					  console.log(success, "content");
					  window.resolveLocalFileSystemURL(success, (fileEntry) => {
						console.log(fileEntry, "fileEntry");
						fileEntry.file((finalFile) => {
						  console.log(finalFile, "resolve");
						});
					  });
					});
				} else {
					window.resolveLocalFileSystemURL(file, (fileEntry) => {
						console.log(fileEntry, "fileEntry");
						fileEntry.file((finalFile) => {
						  console.log(finalFile, "resolve");
						});
					  });
				}
			},
			(err) => {
				console.log(ere);
			},
			{
				quality: 50,
				destinationType: Camera.DestinationType.FILE_URI,
				mediaType: Camera.MediaType.ALLMEDIA,
				sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
				saveToPhotoAlbum: false,
			},
		);
	},
};

app.initialize();
