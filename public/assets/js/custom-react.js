// Notification dropdown functionality
document.addEventListener('DOMContentLoaded', function() {
  const notifyDropdown = document.querySelector("#_notify_drop");
  const notifyDropShowBtn = document.querySelector("#_notify_btn");
  
  if (notifyDropShowBtn && notifyDropdown) {
    let isDropShow1 = false;
    
    notifyDropShowBtn.addEventListener("click", function(){
      isDropShow1 = !isDropShow1;
      if(isDropShow1){
        notifyDropdown.classList.add('show');
      } else {
        notifyDropdown.classList.remove('show');
      }
    });
  }

  // Profile dropdown functionality
  const profileDropdown = document.querySelector("#_prfoile_drop");
  const profileDropShowBtn = document.querySelector("#_profile_drop_show_btn");
  
  if (profileDropShowBtn && profileDropdown) {
    let isProfileDropShow = false;
    
    profileDropShowBtn.addEventListener("click", function(){
      isProfileDropShow = !isProfileDropShow;
      if(isProfileDropShow){
        profileDropdown.classList.add('show');
      } else {
        profileDropdown.classList.remove('show');
      }
    });
  }
});
