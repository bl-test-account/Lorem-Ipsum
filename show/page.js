// Method for adding key value pairs to a list.
appendKeyValueToList = function(listId, key, value) {
  $(listId).append('<li>{' + key + ': ' + value + '}</li>');
}

// Method for adding content to the 'Saved Content' list.
addToContentList = function(value) {
  // Check to see if the content is a string or an object
  if (typeof value == 'string') {
    $('#contentList').append('<li>' + value + '</li>');
  } else {
    $.each(value, function(key, value) {
      appendKeyValueToList('#contentList', key, value);
    });
  }
}

// Update the status when saving content
setStatus = function(status) {
  $('#status').text(status);
}

// Event handler for saving a string.
$('#saveStringForm').on('submit', function() {
  stringToSave = $('#stringInput').val();
  if (stringToSave == "") {
    setStatus('Please enter a string');
  } else {
    setStatus('Saving string...');
    /*
    Pass the string to BL.createContent to save it.
    The second paramater to BL.createContent is a function
    that is called once the content is created successfully.
    */
    BL.createContent(stringToSave, function() {
      setStatus('');
      addToContentList(stringToSave);
    });
  }
  return false;
});

// Event handler for saving an object.
$('#saveObjectForm').on('submit', function() {
  key = $('#keyInput').val();
  val = $('#valueInput').val();
  if (key == "" || val == "") {
    setStatus('Please enter a key and a value');
  } else {
    objectToSave = {}
    objectToSave[key] = val
    setStatus('Saving object...');
    /*
    Pass the object to BL.createContent to save it.
    The second paramater to BL.createContent is a function
    that is called once the content is created successfully.
    */
    BL.createContent(objectToSave, function() {
      setStatus('');
      self.addToContentList(objectToSave);
    });
  }
  return false;
});

 /*
Retrieve saved settings with Bl.getSettings.
Settings are stored as an object with properties
equal to the identifiers of each setting. Each identifier
is a settingsArray that contains the settings corresponding
to each update of the app.
*/
savedSettings = BL.getSettings();
$.each(savedSettings, function(identifier, settingArray) {
  /*
  Add the most recent setting update by accessing the first
  element in the array for each setting.
  */
  if (typeof settingArray  != 'undefined') {
    appendKeyValueToList('#settingsList', identifier, settingArray[0]);
  }
});

 /*
Retrieve saved content with Bl.getContent.
Content is stored as an array of objects with
properties id, data, and created_at. The data property
can either be a string or an object.
*/
savedContent = BL.getContent();
$.each(savedContent, function(index, value) {
  /*
  Add each data property (string or object) to
  the 'Saved Content' list.
  */
  addToContentList(value.data);
});
