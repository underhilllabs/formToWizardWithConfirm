/**
 * Original by jankoatwarpspeed.com 
 * additions by Bart Lantz
 * Adds a confirmation page which shows all of the fieldsets.
 **/

(function($) {
    $.fn.formToWizardWithConfirm = function(options) {
        options = $.extend({  
            submitButton: "" 
        }, options); 
        
        var element = this;

        var steps = $(element).find("fieldset");
        var count = steps.size();
        var submmitButtonName = "#" + options.submitButton;
        $("input#reset").hide();
        $(submmitButtonName).hide();

        // 2
        $(element).before("<ul id='steps'></ul>");

        steps.each(function(i) {
            $(this).wrap("<div id='step" + i + "' class='form-step'></div>");
            $(this).append("<p id='step" + i + "commands' class='step-commands'></p>");

            // 2
            var name = $(this).find("legend").html();
            $("#steps").append("<li id='stepDesc" + i + "'>Step " + (i + 1) + "<span>" + name + "</span></li>");

            if (i == 0) {
                createNextButton(i);
                selectStep(i);
            }
            else if (i == count - 1) {
                $("#step" + i).hide();
                createPrevButton(i);
                // Adding a button to lead to final Confirmation Page.
                createConfirmButton(i);
            }
            else {
                $("#step" + i).hide();
                createPrevButton(i);
                createNextButton(i);
            }
        });
        // Add the confirmation Step to Top steps map
        $("#steps").append("<li id='stepDesc" + count + "'>Step " + (count + 1) + "<span><span class='fieldset-legend'>Confirm Ballot</span></span></li>");


        function createConfirmButton(i) {
            var stepName = "step" + i;
            $("#" + stepName + "commands").append("<a href='#' id='confirm' class='confirm'>Confirm Ballot >> </a>")

            $("#confirm").bind("click", function(e) {
                $("#" + stepName).hide();
                $("#confirmPage").show();
                $("input#reset").show();
                // Show Submit Button
                $(submmitButtonName).show();
                // Adjust the Steps Map at top of page
                $("#steps li").removeClass("current");
                // Show each fieldset
                $("#ucdelection-multiballot-form div.form-step").css('display', 'block');
                $("#ucdelection-multiballot-form p.step-commands").css('display', 'none');
                $("#ucdelection-multiballot-form div.form-type-radio").css('visibility', 'hidden');
                // Unbind the click trigger on tr
                $('tbody tr').unbind("click");
                $('tbody tr.hilite td:first-child').append("<span class='winner'>&#x2713;</span>");
                selectStep(i + 1);
            });
        }
        function createPrevButton(i) {
            var stepName = "step" + i;
            $("#" + stepName + "commands").append("<a href='#' id='" + stepName + "Prev' class='prev'>< Back</a>");

            $("#" + stepName + "Prev").bind("click", function(e) {
                $("#" + stepName).hide();
                $("#step" + (i - 1)).show();
                $(submmitButtonName).hide();
                selectStep(i - 1);
            });
        }

        function createNextButton(i) {
            var stepName = "step" + i;
            $("#" + stepName + "commands").append("<a href='#' id='" + stepName + "Next' class='next'>Next ></a>");

            $("#" + stepName + "Next").bind("click", function(e) {
                $("#" + stepName).hide();
                $("#step" + (i + 1)).show();
                // This is only enabled on the Confirmation Page.
                //if (i + 2 == count)
                //    $(submmitButtonName).show();
                selectStep(i + 1);
            });
        }

        function selectStep(i) {
            $("#steps li").removeClass("current");
            $("#stepDesc" + i).addClass("current");
        }

    }
})(jQuery); 
