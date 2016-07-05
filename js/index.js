 $(document).ready(function() {
   var $display = $('#display'); //display window
   var number = ''; //value of buttons
   var display_text = '';
   var isNegative = false;
   var isInvalid = false;
   var result = 0;

   $('.operator').click(function() {
     isNegative = false;
     readDisplayText();
     //prevents chaining two or more operators in display window
     if (display_text.match(/[.+\-*/\(]$/)) {
       display_text = display_text.slice(0, -1);
     }
     display_text += $(this).text();
     updateDisplay();
   });

   //calculating power
   $('.power').click(function() {
     readDisplayText();
     var replacedNumber;
     //saving number to be worked with to var replacedNumber
     if (isNegative) {
       replacedNumber = display_text.match(/[-(?=\d).(?=\d)\d]+$/);
       isNegative = false;
     } else replacedNumber = display_text.match(/[.(?=\d)\d]+$/);
     console.log(replacedNumber);
     number = Math.pow(replacedNumber, 2);
     display_text = display_text.replace(replacedNumber, number);
     updateDisplay();
     display_text = '';
   });

   //calculating sqrt
   $('.sqrt').click(function() {
     if (isNegative) {
       display_text = 'Invalid input';
       isNegative = false;
     } else {
       readDisplayText();
       var replacedNumber = display_text.match(/[.(?=\d)\d]+$/);
       number = Math.sqrt(replacedNumber, 2);
       display_text = display_text.replace(replacedNumber, number);
     }
     updateDisplay();
     display_text = '';
   });

   //assigning plus/minus sign
   $('.pm').click(function() {
     readDisplayText();
     var replacedNumber = display_text.match(/[.(?=\d)\d]+$/);
     if (!isNegative) {
       number = '-' + replacedNumber;
       isNegative = true;
     } else if (isNegative) {
       number = replacedNumber;
       replacedNumber = display_text.match(/-(?=\d+$)/) + replacedNumber;
       isNegative = false;
     }
     display_text = display_text.replace(replacedNumber, number);
     updateDisplay();
   });

   //displaying PI
   $('.pi').click(function() {
     display_text += Math.PI.toFixed(4);
     updateDisplay();
   });

   $('.decimal').click(function() {
     if ( display_text.match( /\.$/) ) {
       display_text = display_text;
     }
      else if ( display_text === '' || display_text.match(/\D$/) ) {
      display_text = display_text + '0' + $(this).text();
     }
      else display_text += $(this).text();
     updateDisplay();
   });

   $('.number').click(function() {
     display_text += $(this).text();
     updateDisplay();
   });

   $('.parenthesis').click(function() {
     display_text += $(this).text();
     updateDisplay();
   });
   //getting final result of calculation
   $('#equal').click(function() {
     if (display_text.match(/[.\+\-\*\\]$/)) display_text = display_text.slice(0, -1);
     result = eval(display_text);
     $display.text(result);
     //number = '';
     display_text = '';
     if (result < 0) isNegative = true;
     else isNegative = false;
   });

   //clearing values
   // <- means clearing last input in display
   var clear = $('#clear');
   clear.click(function() {
     display_text = display_text.slice(0, -1);
     $display.text(display_text);
   });

   //AC means clearing all previous calculations and display
   var all_clear = $('#all_clear');
   all_clear.click(function() {
     display_text = '';
     $display.text('');
     isNegative = false;
   });

   function readDisplayText() {
     display_text = $display.text();
   }

   function updateDisplay() {
     $display.text(display_text);
   }

 });

 //  defines event listener for pressing Enter key  
 $(document).keyup(function(e) {
   if (e.keyCode === 13) {
     $('#equal').click();
   }
 });