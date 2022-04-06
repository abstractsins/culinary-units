// TODO: 
// 1) add selected unit abbreviation to field

/* TABLE OF CONTENTS */
// 1 -- Global Concerns
// 2 -- Tab Browsing
// 3 -- Unit Object
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

/* 3 -- UNIT OBJECT */
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
                toKilos: (pounds)=>pounds*0.02834952
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
/* END 3 -- UNIT OBJECT*/

/* 4 -- MODE RADIO BUTTON FUNCTION */
const modeSelect = mode => {
    // reset button text
    $inputBtn.html('Select Unit');
    $outputBtn.html('Select Unit');
    // reset input/output
    $input.val('');
    $output.val('');
    // CONSOLE TESTING
    console.log(`You selected ${mode} mode`);
    // define the mode state
    unitMode = mode;

    let unitsArr = [];
    if (mode === 'weight') {
        // create array of unit types
        unitsArr = Object.keys(Units.Weight);
        // and apply button styles
        if ($weightBtn.hasClass('active')) {
            $weightBtn.removeClass('active')
            unitsArr = [];
        } else {
            $weightBtn.addClass('active')
        };
        $volumeBtn.removeClass('active');
    } else if (mode === 'volume') {
        // create array of unit types
        unitsArr = Object.keys(Units.Volume);
        // and apply button styles
        if ($volumeBtn.hasClass('active')) {
            $volumeBtn.removeClass('active')
            unitsArr = [];
        } else {
            $volumeBtn.addClass('active');
        }
        $weightBtn.removeClass('active');
    }
    console.log(unitsArr);

    // apply unit array to dropdowns
    let unitsList = [];
    unitsArr.forEach(unit=>{
        let inputStr = '<a onclick="unitSelect(\''+unit+'\', \'input\'), conversion()">'+unit+'</a>';
        let outputStr = '<a onclick="unitSelect(\''+unit+'\', \'output\'), conversion()">'+unit+'</a>';
        unitsList.push([inputStr,outputStr]);
    })
    const unitsListInput=unitsList.map(units=>units[0])
    const unitsListOutput=unitsList.map(units=>units[1])
    $inputDrop.html(unitsListInput)
    $outputDrop.html(unitsListOutput)

}
/* END 4 -- MODE RADIO BUTTON FUNCTION */

/* 5 -- INPUT CONTROLS */
function isNumberKey(evt) {
    let charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode === 46 && $input.val().includes('.')) return false;
    if (charCode !== 46 && charCode > 31 && (charCode < 48 || charCode > 57)) return false;
    return true;
}

// Selecting the input unit
function unitSelect(unit, io){
    if (io==='input') { 
        $inputBtn.html(unit)    
        console.log(`you selected the ${unit} unit as your ${io}`);
        inputUnit = unit;
    } else if (io==='output') {
        $outputBtn.html(unit)    
        console.log(`you selected the ${unit} unit as your ${io}`);
        outputUnit = unit;
    }
}

$output.on('focus', function(e) {
    $output.css("background-color", "whitesmoke")
    e.preventDefault();
})
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
    $output.val(eval(functionStr));
    // make sure it doesn't display any non number
    if ($output.val()==='NaN') {
        $output.val('')
    }
}
/* END 6 -- CONVERSION FUNCTION CALL */

/* EXPERIMENTS*/
/* END -- EXPERIMENTS*/

/* EXECUTIONS */
/* END -- EXECUTIONS */

