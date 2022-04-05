/* TABLE OF CONTENTS */
// 1 -- Global Concerns
// 2 -- Unit Objects
// 3 -- Executions
/* END TABLE OF CONTENTS */

/* 1 -- GLOBAL CONCERNS*/
/* END 1 -- GLOBAL CONCERNS*/

/* 2 -- UNIT OBJECTS */
const Units = {
    Weight: {
        Grams: {
            unit: 'g',
            type: 'weight',
            formulas: {
                toGrams: (grams)=>grams,
                toOunces: (grams)=>grams/0.03527396195,
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
/* END 2 -- UNIT OBJECTS*/

/* TAB BROWSING */
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
/* END -- TAB BROWSING */

/* 8-C -- TAG RADIO BUTTON FUNCTION */
const modeSelect = mode => {
    // CONSOLE TESTING
    console.log(`You selected ${mode} mode`);

    let $unitSelect1 = $('#results-1');
    let $unitSelect2 = $('#results-2');
    let $weightBtn = $('#weight');
    let $volumeBtn = $('#volume');

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

    $unitSelect1.text(unitsArr);
    $unitSelect2.text(unitsArr);

}

// function tagSort(idNum){
// 	let tag = document.getElementById(idNum);
// 	let tagGroup = document.getElementsByClassName('tag master');
// 	let $ul = $('#tag-results');
// 	for (let i=0; i<tagGroup.length; i++) {
// 		if (i === idNum) {
// 			// IF TAG IS THE ONE YOU CLICKED THEN APPLY STYLES
// 			tagGroup[i].style.backgroundColor = 'whitesmoke'; 
// 			tagGroup[i].style.transform = '';
// 			tagGroup[i].style.filter = 'unset';
// 			tagGroup[i].classList.add('active');
			
// 			/* FILTER RESULTS GO HERE */
// 			let tagName = tagGroup[i].innerHTML;
// 			let results = [];
// 			recipeArr.find(el => {
// 				for (let i=0; i<7; i++) {
// 					if (el.tags[i] === tagName) {
// 						results.push(`<a href="#recipe-display-section" id="${el.id}" onclick="titleClick(${el.id})"><li class="title master">${el.name}</li>`);
// 					}
// 				}
// 			})
// 			$ul.empty();
// 			// HERE SPECIFICALLY
// 			$ul.append(`${results.join('<br>')}</li>`); // RIGHT HERE
// 		} else if (i != idNum){ // ALL OTHER TAGS
// 			tagGroup[i].style.backgroundColor = 'var(--tag-bg)';
// 			tagGroup[i].style.filter = '';
// 			tagGroup[i].classList.remove('active');
// 		}
// 	}
// }
/* END 8-C -- TAG RADIO BUTTON FUNCTION */

/* EXECUTIONS */
/* END -- EXECUTIONS */

