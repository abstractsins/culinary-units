// TODO: 
// - Fraction buttons
// - Fraction input logic
// --- when there is no input yet -- make it the input with a 0 - done!
// --- when there is already a decimal -- change it
// --- when there is no decimal -- add it

/* TABLE OF CONTENTS */
// 1 -- Global Concerns
// 2 -- Tab Browsing
// 3 -- Objects
// 3A -- Units Object
// 3B -- Fractions Object
// 4 -- Mode Radio Button Function
// 5 -- Input Controls
// 6 -- Conversion Function Call
/* END TABLE OF CONTENTS */

/* 1 -- GLOBAL CONCERNS*/
const $input = $('#input');
const $output = $('#output');
const $inputDrop = $('#input-dropdown');
const $inputBtn = $('#input-dropbtn')
const $outputDrop = $('#output-dropdown');
const $outputBtn = $('#output-dropbtn')
const $unitSelect1 = $('#results-1');
const $unitSelect2 = $('#results-2');
const $weightBtn = $('#weight');
const $volumeBtn = $('#volume');
let unitMode, inputUnit, outputUnit;
/* END 1 -- GLOBAL CONCERNS*/

/* 2 -- TAB BROWSING */
	// as described on page 499 of "JavaScript and JQuery," by Jon Duckett
    $('.tab-list').each(function() {
        let $this = $(this);
        let $tab = $this.find('li.active');
        let $link = $tab.find('a');
        let $panel = $($link.attr('href'));
    
        $this.on('click', '.tab-control', function(e) {
            e.preventDefault();
            let $link = $(this);
            let id = this.hash;
    
            if (id && !$link.is('.active')) {
                $panel.removeClass('active');
                $tab.removeClass('active');
    
                $panel = $(id).addClass('active');
                $tab = $link.parent().addClass('active');
            }
        });
    });
/* END 2 -- TAB BROWSING */

/* 3 -- OBJECTS */
/* 3A -- UNITS OBJECT */
const Units = {
    Weight: {
        Grams: {
            unit: 'g',
            type: 'weight',
            formulas: {
                toGrams: (grams)=>grams,
                toOunces: (grams)=>grams*0.03527396195,
                toPounds: (grams)=>grams/453.59237,
                toKilos: (grams)=>grams/1000
            }
        },
        Ounces: {
            unit: 'oz',
            type: 'weight',
            formulas: {
                toGrams: (ounces)=>ounces*28.34952,
                toOunces: (ounces)=>ounces,
                toPounds: (ounces)=>ounces/16,
                toKilos: (ounces)=>ounces*0.02834952
            }
        },
        Pounds: {
            unit: 'lbs',
            type: 'weight',
            formulas: {
                toGrams: (pounds)=>pounds*453.59237,
                toOunces: (pounds)=>pounds*16,
                toPounds: (pounds)=>pounds,
                toKilos: (pounds)=>pounds*0.453592
            }
        },
        Kilos: {
            unit: 'kg',
            type: 'weight',
            formulas: {
                toGrams: (kilos)=>kilos*1000,
                toOunces: (kilos)=>kilos*35.27396195,
                toPounds: (kilos)=>kilos*2.20462262185,
                toKilos: (kilos)=>kilos
            }
        }
    },
    Volume: {
        Teaspoon: {
            unit: 'tsp',
            type: 'volume',
            formulas: {
                toTeaspoon: (teaspoon)=>teaspoon,
                toTablespoon: (teaspoon)=>teaspoon/3,
                toFluidOunce: (teaspoon)=>teaspoon*0.166667,
                toMilliliter: (teaspoon)=>teaspoon*4.92892,
                toCup: (teaspoon)=>teaspoon*0.0208333,
                toPint: (teaspoon)=>teaspoon*0.0104167,
                toCentiliter: (teaspoon)=>teaspoon*0.492892,
                toQuart: (teaspoon)=>teaspoon*0.00520833,
                toLiter: (teaspoon)=>teaspoon*0.00492892,
                toGallon: (teaspoon)=>teaspoon*0.00130208
            }
        },
        Tablespoon: {
            unit: 'Tbsp',
            type: 'volume',
            formulas: {
                toTeaspoon: (tablespoon)=>tablespoon*3,
                toTablespoon: (tablespoon)=>tablespoon,
                toFluidOunce: (tablespoon)=>tablespoon/2,
                toMilliliter: (tablespoon)=>tablespoon*14.7868,
                toCup: (tablespoon)=>tablespoon/16,
                toPint: (tablespoon)=>tablespoon/32,
                toCentiliter: (tablespoon)=>tablespoon*1.47868,
                toQuart: (tablespoon)=>tablespoon/64,
                toLiter: (tablespoon)=>tablespoon*0.0147868,
                toGallon: (tablespoon)=>tablespoon/256
            }
        },
        FluidOunce: {
            unit: 'fl oz',
            type: 'volume',
            formulas: {
                toTeaspoon: (fluidOunce)=>fluidOunce*6,
                toTablespoon: (fluidOunce)=>fluidOunce*2,
                toFluidOunce: (fluidOunce)=>fluidOunce,
                toMilliliter: (fluidOunce)=>fluidOunce*29.5735,
                toCup: (fluidOunce)=>fluidOunce/8,
                toPint: (fluidOunce)=>fluidOunce/16,
                toCentiliter: (fluidOunce)=>fluidOunce*2.95735,
                toQuart: (fluidOunce)=>fluidOunce/32,
                toLiter: (fluidOunce)=>fluidOunce*0.0295735,
                toGallon: (fluidOunce)=>fluidOunce/128
            }
        },
        Milliliter: {
            unit: 'mL',
            type: 'volume',
            formulas: {
                toTeaspoon: (milliliter)=>milliliter*0.202884,
                toTablespoon: (milliliter)=>milliliter*0.067628,
                toFluidOunce: (milliliter)=>milliliter*0.033814,
                toMilliliter: (milliliter)=>milliliter,
                toCup: (milliliter)=>milliliter*0.00422675,
                toPint: (milliliter)=>milliliter*0.00211338,
                toCentiliter: (milliliter)=>milliliter*0.1,
                toQuart: (milliliter)=>milliliter*0.00105669,
                toLiter: (milliliter)=>milliliter*0.001,
                toGallon: (milliliter)=>milliliter*0.000264172
            }
        },
        Cup: {
            unit: 'c',
            type: 'volume',
            formulas: {
                toTeaspoon: (cup)=>cup*48,
                toTablespoon: (cup)=>cup*16,
                toFluidOunce: (cup)=>cup*8,
                toMilliliter: (cup)=>cup,
                toCup: (cup)=>cup,
                toPint: (cup)=>cup/2,
                toCentiliter: (cup)=>cup*23.6588,
                toQuart: (cup)=>cup/4,
                toLiter: (cup)=>cup*0.236588,
                toGallon: (cup)=>cup/16
            }
        },
        Pint: {
            unit: 'pt',
            type: 'volume',
            formulas: {
                toTeaspoon: (pint)=>pint*2*8*2*3,
                toTablespoon: (pint)=>pint*2*8*2,
                toFluidOunce: (pint)=>pint*2*8,
                toMilliliter: (pint)=>pint*473.176,
                toCup: (pint)=>pint*2,
                toPint: (pint)=>pint,
                toCentiliter: (pint)=>pint*47.3176473,
                toQuart: (pint)=>pint/2,
                toLiter: (pint)=>pint*0.473176,
                toGallon: (pint)=>pint/8
            }
        },
        Centiliter: {
            unit: 'cL',
            type: 'volume',
            formulas: {
                toTeaspoon: (centiliter)=>centiliter*2.02884,
                toTablespoon: (centiliter)=>centiliter*0.67628,
                toFluidOunce: (centiliter)=>centiliter*0.33814,
                toMilliliter: (centiliter)=>centiliter*10,
                toCup: (centiliter)=>centiliter*0.0422675,
                toPint: (centiliter)=>centiliter*0.0211338,
                toCentiliter: (centiliter)=>centiliter,
                toQuart: (centiliter)=>centiliter*0.0105669,
                toLiter: (centiliter)=>centiliter*0.01,
                toGallon: (centiliter)=>centiliter*0.00264172
            }
        },
        Quart: {
            unit: 'qt',
            type: 'volume',
            formulas: {
                toTeaspoon: (quart)=>quart*4*8*2*3,
                toTablespoon: (quart)=>quart*4*8*2,
                toFluidOunce: (quart)=>quart*4*8,
                toMilliliter: (quart)=>quart*946.353,
                toCup: (quart)=>quart*4,
                toPint: (quart)=>quart*2,
                toCentiliter: (quart)=>quart*94.6353,
                toQuart: (quart)=>quart,
                toLiter: (quart)=>quart*0.946353,
                toGallon: (quart)=>quart/4
            }
        },
        Liter: {
            unit: 'L',
            type: 'volume',
            formulas: {
                toTeaspoon: (liter)=>liter*33.814*2*3,
                toTablespoon: (liter)=>liter*33.814*2,
                toFluidOunce: (liter)=>liter*33.814,
                toMilliliter: (liter)=>liter*1000,
                toCup: (liter)=>liter*4.22675,
                toPint: (liter)=>liter*2.11338,
                toCentiliter: (liter)=>liter*100,
                toQuart: (liter)=>liter*1.05669,
                toLiter: (liter)=>liter,
                toGallon: (liter)=>liter*0.264172
            }
        },
        Gallon: {
            unit: 'G',
            type: 'volume',
            formulas: {
                toTeaspoon: (gallon)=>gallon*128*2*3,
                toTablespoon: (gallon)=>gallon*128*2,
                toFluidOunce: (gallon)=>gallon*128,
                toMilliliter: (gallon)=>gallon*3785.41,
                toCup: (gallon)=>gallon*16,
                toPint: (gallon)=>gallon*8,
                toCentiliter: (gallon)=>gallon*378.541,
                toQuart: (gallon)=>gallon*4,
                toLiter: (gallon)=>gallon*3.78541,
                toGallon: (gallon)=>gallon
            }
        }
    }
}
/* END 3A -- UNITS OBJECT*/

/* 3B -- FRACTIONS OBJECT*/
const Fractions = {
    halves: [0, ['1/2', .5]],
    thirds: [0, ['1/3', .333], ['2/3',.667]],
    fourths: [0, ['1/4',.25], ['2/4',.5], ['3/4',.75]],
    fifths: [0, ['1/5',.2], ['2/5',.4], ['3/5',.6], ['4/5',.8]],
    sixths: [0, ['1/6',.167], ['2/6',.333], ['3/6',.5], ['4/6',.667], ['5/6',.833]],
    sevenths: [0, ['1/7',.143], ['2/7',.286], ['3/7',.429], ['4/7',.571], ['5/7',.714], ['6/7',.857]],
    eighths: [0, ['1/8',.125], ['2/8',.25], ['3/8',.375], ['4/8',.5], ['5/8',.625], ['6/8',.75], ['7/8',.875]],
    ninths: [0, ['1/9',.111], ['2/9',.222], ['3/9',.333], ['4/9',.444], ['5/9',.556], ['6/9',.667], ['7/9',.778], ['8/9',.889]]
}
/* END 3B -- FRACTIONS OBJECT*/
/* END 3 -- OBJECTS*/

/* 4 -- MODE RADIO BUTTON FUNCTION */
const modeSelect = mode => {
    // reset button text
    $inputBtn.html('Select Unit');
    $outputBtn.html('Select Unit');
    // reset input/output
    $input.val('');
    $output.val('');
    // define the mode state
    unitMode = mode;

    let units = [];
    let abbrvs = [];
    let unitsArr = [];

    if (mode === 'weight') {
        // create array of unit types and abbreviations
        units = Object.keys(Units.Weight);
        units = Object.keys(Units.Weight);
        units.forEach(U=>abbrvs.push(Units.Weight[U].unit))
        for (let i=0; i<units.length; i++) unitsArr.push([units[i], abbrvs[i]]);
        // and apply button styles
        if ($weightBtn.hasClass('active')) {
            $weightBtn.removeClass('active')
            unitsArr = [];
            // CONSOLE TESTING
            console.log(`You turned off ${mode} mode`);   
            unitMode = 'none';         
        } else {
            $weightBtn.addClass('active')
            // CONSOLE TESTING
            console.log(`You selected ${mode} mode`);
        };
        $volumeBtn.removeClass('active');
    } else if (mode === 'volume') {
        // create array of unit types and abbreviations
        units = Object.keys(Units.Volume);
        units.forEach(U=>abbrvs.push(Units.Volume[U].unit))
        for (let i=0; i<units.length; i++) unitsArr.push([units[i], abbrvs[i]]);
        // and apply button styles
        if ($volumeBtn.hasClass('active')) {
            $volumeBtn.removeClass('active')
            unitsArr = [];
            // CONSOLE TESTING
            console.log(`You turned off ${mode} mode`);   
            unitMode = 'none';         
        } else {
            $volumeBtn.addClass('active');
            // CONSOLE TESTING
            console.log(`You selected ${mode} mode`);
        }
        $weightBtn.removeClass('active');
    }
    console.log(unitsArr);

    // apply unit array to dropdowns
    let unitsList = [];
    unitsArr.forEach(unit=>{
        let inputStr = '<a onclick="unitSelect(\''+unit[0]+'\', \''+unit[1]+'\', \'input\'), conversion()">'+unit[0]+' ('+unit[1]+')</a>';
        let outputStr = '<a onclick="unitSelect(\''+unit[0]+'\', \''+unit[1]+'\', \'output\'), conversion()">'+unit[0]+' ('+unit[1]+')</a>';
        unitsList.push([inputStr,outputStr]);
    })
    const unitsListInput=unitsList.map(units=>units[0])
    const unitsListOutput=unitsList.map(units=>units[1])
    $inputDrop.html(unitsListInput)
    $outputDrop.html(unitsListOutput)

}
/* END 4 -- MODE RADIO BUTTON FUNCTION */

/* 5 -- INPUT CONTROLS */
// Allowing only numbers and decimal point as input
function isNumberKey(evt) {
    let charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode === 46 && $input.val().includes('.')) return false;
    if (charCode !== 46 && charCode > 31 && (charCode < 48 || charCode > 57)) return false;
    return true;
}

// Selecting the input/output unit
function unitSelect(unit, abbrv, io) {
    if (io==='input') { 
        $inputBtn.html(`${unit} (${abbrv})`)    
        console.log(`you selected the ${unit} unit as your ${io}`);
        inputUnit = unit;
    } else if (io==='output') {
        $outputBtn.html(`${unit} (${abbrv})`)    
        console.log(`you selected the ${unit} unit as your ${io}`);
        outputUnit = unit;
    }
}

// Unsetting CSS styles on output:focus
$output.on('focus', function(e) {
    $output.css("background-color", "whitesmoke")
    e.preventDefault();
})

// Adding fractions to input
function addFrac(fraction) {
    let input = $input.val();
    let deciP = input.indexOf('.');
    // CONSOLE TESTING
    console.log(`you have selected the fraction: ${fraction[0]}, decimal value: ${fraction[1]}`)
    // If there is no input yet... place it....
    if (input === '') {
        $input.val(fraction[1])
        conversion();
    }
    // If there is no decimal already... add it;
    else if (deciP === -1) {
        $input.val(Number(input)+fraction[1])
        if (unitMode !=='none') conversion();
    }
    // If there is a decimal... replace it;
    else if (deciP !== -1 ) {
        input -= Number(input.split('').splice(deciP, input.length-1).join(''));
        $input.val(Number(input)+fraction[1])
        if (unitMode !=='none') conversion();
    }
}
/* END 5 -- INPUT CONTROLS*/

/* 6 -- CONVERSION FUNCTION CALL */
function conversion(){
    // define the argument
    const input = $input.val()
    // build function string;
    let functionStr='';
    if (unitMode==='weight') functionStr+='Units.Weight'
    else if (unitMode==='volume') functionStr+='Units.Volume';
    functionStr+=`.${inputUnit}.formulas.to${outputUnit}(${input})`;
    // call the function string
    let output = eval(functionStr).toString();
    // set decimal places
    const outputArrRev = output.split('').reverse();
    const deciCount = outputArrRev.indexOf('.');
    if (deciCount > 3) {
        console.log('number has more than 3 deci')
        const diff = deciCount - 3;
        outputArrRev.splice(0, diff);
    }
    output = outputArrRev.reverse().join('');
    // Write output
    $output.val(output);
    // make sure it doesn't display any non number
    if ($output.val()==='NaN') $output.val('');
}
/* END 6 -- CONVERSION FUNCTION CALL */

/* EXPERIMENTS*/
/* END -- EXPERIMENTS*/

/* EXECUTIONS */
/* END -- EXECUTIONS */

