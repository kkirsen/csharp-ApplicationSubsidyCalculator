function createAdfox(id, p1, p2){
    if(document.getElementById(id) !== null){
        window.Ya.adfoxCode.create({
            ownerId: 271489,
            containerId: id,
            params: {
                p1: p1,
                p2: p2,
                eid1: document.location.host
            }
        });
    }
}
function createAdaptiveAdfox(id, p1, p2, devices, tabletWidth) {
    if (document.getElementById(id) !== null) {
        window.Ya.adfoxCode.createAdaptive({
            ownerId: 239538,
            containerId: id,
            params: {
                p1: p1,
                p2: p2
            }
        }, devices, {
            tabletWidth: tabletWidth,
            phoneWidth: 480,
            isAutoReloads: false
        });
    }
}

createAdfox('adfox_153130851584228147','cbiid','fxgs');
createAdfox('adfox_15299260376398129','cbfrc','fxjj');
createAdfox('adfox_154745510436632310','cdbvj','gfmh');
createAdfox('adfox_154753620158919883','cdbyy','gfmh');
createAdfox('adfox_152992761687945500','cbfrd','fxkk');
createAdfox('adfox_15307043357052398','cbhgl','fxjr');
createAdfox('adfox_15313097731482731','cbiiv','fyzz');
createAdfox('adfox_153130911784644509','cbiig','fxgs');
createAdfox('adfox_15313096979943314','cbiiu','fyzz');
createAdfox('adfox_153130898920696268','cbiif','fxgs');
createAdfox('adfox_153130962873067326','cbiit','fyzz');
createAdfox('adfox_153191757739629999','cbjfp','fydv');
createAdfox('adfox_153191766286746516','cbjfq','fydv');
createAdfox('adfox_153079167129513175','cbhja','fyzz');
createAdfox('adfox_153079149836124156','cbhiz','fxgs');
createAdfox('adfox_153131508309296696','cbijh','gaox');
createAdfox('adfox_154745323743273321','cdbvh','gfml');
createAdfox('adfox_154745810972565781','cdbvy','gfmy');
createAdfox('adfox_154745772070466572','cdbvv','gfmx');
createAdfox('adfox_154349620488465926','cctik','gept');
createAdfox('adfox_154745722085396319','cdbvq','gfmh');
createAdfox('adfox_155125262575592076','cdthb','fyyg');
createAdfox('adfox_155386757005716570','cbjmg','gave');

createAdfox('adfox_154745255307331527','cdbve','gfmd');
createAdfox('adfox_154745289566762897','cdbvg','gfmj');
createAdfox('adfox_154745638665226280','cdbvn','gfme');
createAdfox('adfox_15474568330695319','cdbvo','gfme');
createAdfox('adfox_15475358511496223','cdbyw','gfme');