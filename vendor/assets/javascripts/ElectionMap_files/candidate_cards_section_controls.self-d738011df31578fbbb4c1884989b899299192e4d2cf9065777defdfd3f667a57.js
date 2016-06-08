var CandidateCardsSectionControls = React.createClass({
   displayName: "CandidateCardsSectionControls",

   render: function () {
      return React.createElement(
         "div",
         { className: "two ui basic buttons" },
         React.createElement(
            "button",
            { className: "ui active button" },
            "Active"
         ),
         React.createElement(
            "button",
            { className: "ui button" },
            "Eliminated"
         )
      );
   }
});
