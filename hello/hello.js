(function ($) {

   var UserInputView = Backbone.View.extend({
      // UserInput is the id of text and button section
      el: '#UserInput',

      initialize: function () {
         this.helloListView = new HelloListView();
      },

      events: {
         'click button': 'addToHelloCollection'
      },

      addToHelloCollection: function (e) {
         var hello = new Hello({
            name: this.$('input').val()
         });
         this.helloListView.collection.add(hello);
      }
   });

   var Hello = Backbone.Model.extend({
      initialize: function () {
         this.name = 'name'
      }
   });

   var HelloView = Backbone.View.extend({
      tagName: 'li',
      render: function () {
         $(this.el).html('Hello ' + this.model.get('name'));
         return this;
      }
   });

   var HelloList = Backbone.Collection.extend({
      model: Hello
   });

   var HelloListView = Backbone.View.extend({
      // HelloList is the id of list
      el: '#HelloList',

      initialize: function () {
         _.bindAll(this, 'render', 'appendToHelloUL');
         this.collection = new HelloList();
         this.collection.bind('add', this.appendToHelloUL);
      },

      render: function () {

         $.each(this.collection.models, function (i, helloModel) {
            self.appendToHelloUL(helloModel);
         });
      },

      appendToHelloUL: function (helloModel) {
         var helloView = new HelloView({
            model: helloModel
         });
         $(this.el).append(helloView.render().el);
      }
   });

   new UserInputView();

})(jQuery);