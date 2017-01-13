#!/bin/sh

bowerDir=bower_components
elementName=vaadin-context-menu
elementDir=$bowerDir/$elementName
reportDir=./target
reportFile=$reportDir/output.json
testDir=test/light
demoDir=demo

lighthouse=node_modules/.bin/lighthouse
serve=node_modules/.bin/serve

perfThreshold=0.75
tests="$testDir/test.html $demoDir/index.html"

mkdir -p $elementDir/$testDir
mkdir -p $elementDir/$demoDir
cp *.html *.js* $elementDir
cp $testDir/* $elementDir/$testDir
cp $demoDir/* $elementDir/$demoDir

mkdir -p $reportDir

# --compress improves results
$serve --compress --no-logs $bowerDir &
proc=$!

trap "kill $proc" SIGINT SIGTERM EXIT

for i in $tests
do
  url=http://localhost:3000/$elementName/$i
  name=`echo $i | tr / _`
  name=`basename $name .html`".json"
  out=$reportDir/$name

  $lighthouse $url --perf --output=json > $out

  node -e "var t = require('$out').aggregations[0].total; console.log(' >> lighthouse result $i', t); process.exit($perfThreshold <  t? 0: 1)" || exit 1
done

echo LightHouse tests for $elementName Succeed
