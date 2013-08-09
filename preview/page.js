/*
Get the current location and user information by calling
BL.getContext.The returned object contains the lightGroupId,
lightGroupName, and userId properties.
*/
context = BL.getContext();
$('#description').text('Hello World: This is the preview page that gets used to preview your app. Click to view the display page of your app');
$('#lightGroupId').text(context.lightGroupId);
$('#lightGroupName').text(context.lightGroupName);
$('#userId').text(context.userId);

// Register a click handler on the entire preview
$('#container').on('click', function() {
  // Open the show page by calling BL.displayApp(APP.appId).
  BL.displayApp(APP.appId);
});
