define("app/controllers/application",["exports"],function(t){"use strict";t["default"]=Ember.Controller.extend({currentUser:function(){return this.get("authManager.apiKey.user")}.property("authManager.apiKey.user"),isSignedIn:function(){return this.get("authManager").isAuthenticated()}.property("authManager.apiKey.access_token"),routeChanged:function(){return window._gaq?Em.run.next(function(){var t=window.location.hash.length>0?window.location.hash.substring(1):window.location.pathname;return window._gaq.push(["_trackPageview",t])}):void 0}.observes("currentPath"),numOfOrganizations:null,numOfUniversities:null,numOfStates:null,currentYear:function(){return(new Date).getFullYear()}.property(),homePage:function(){return"index"===this.get("currentPath")}.property("currentPath"),directoryPage:function(){return this.get("currentPath")&&this.get("currentPath").match(/directory\./)?!0:!1}.property("currentPath"),storyPage:function(){return this.get("currentPath")&&this.get("currentPath").match(/news\./)?!0:!1}.property("currentPath"),staticPage:function(){return this.get("homePage")?!1:this.get("newsPage")?!1:this.get("directoryPage")?!1:this.get("currentPath").capitalize()}.property("currentPath","homePage"),collegeDesisOrg:null})});