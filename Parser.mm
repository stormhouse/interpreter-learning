<map version="1.0.1">
<!-- To view this file, download free mind mapping software FreeMind from http://freemind.sourceforge.net -->
<node CREATED="1487383034243" ID="ID_490904736" MODIFIED="1487383041981" TEXT="Parser">
<node CREATED="1487383043088" ID="ID_1912232911" MODIFIED="1487383049306" POSITION="right" TEXT="Token">
<node CREATED="1487383073859" ID="ID_1747308524" MODIFIED="1487383081586" TEXT="Identifier">
<node CREATED="1487392686787" ID="ID_16388589" MODIFIED="1487392690316" TEXT="regex">
<node CREATED="1487392690874" ID="ID_143626339" MODIFIED="1487392701418" TEXT="[_A-Za-z][_A-Za-z0-9]*">
<node CREATED="1487392709857" ID="ID_1127359037" MODIFIED="1487392712875" TEXT="foo foo1 foo_1 foo1_ _foo _foo1 _foo_1 9foo"/>
<node CREATED="1487392753796" ID="ID_1375403442" MODIFIED="1487392767242" TEXT="== &lt;= &gt;= &amp;&amp; ||"/>
</node>
<node CREATED="1487392798010" ID="ID_1988152814" MODIFIED="1487392800153" TEXT="[_A-Za-z][_A-Za-z0-9]*|==|&lt;=|&gt;=|&amp;&amp;|\|\||\p{Punct}"/>
</node>
<node CREATED="1487383100241" ID="ID_730124622" MODIFIED="1487383119947" TEXT="&#x53d8;&#x91cf;&#x540d;"/>
<node CREATED="1487383121501" ID="ID_1276194483" MODIFIED="1487383125372" TEXT="&#x51fd;&#x6570;&#x540d;"/>
<node CREATED="1487383127312" ID="ID_1884969852" MODIFIED="1487383131794" TEXT="&#x7c7b;&#x540d;"/>
<node CREATED="1487383237667" ID="ID_650539846" MODIFIED="1487383259876" TEXT="+ - &lt; &#x7b49;&#x8fd0;&#x7b97;&#x7b26;"/>
<node CREATED="1487383348361" ID="ID_1658529458" MODIFIED="1487383353108" TEXT="&#x4fdd;&#x7559;&#x5b57;"/>
</node>
<node CREATED="1487383091663" ID="ID_1289208697" MODIFIED="1487383095162" TEXT="Number"/>
<node CREATED="1487383096562" ID="ID_1548502901" MODIFIED="1487383097986" TEXT="String">
<node CREATED="1487395615007" ID="ID_1774296397" MODIFIED="1487395617018" TEXT="regex">
<node CREATED="1487395617539" ID="ID_1359732408" MODIFIED="1487395648994" TEXT="([&apos;&quot;])(\\\1|.)*?\1">
<icon BUILTIN="yes"/>
</node>
<node CREATED="1487395633233" ID="ID_944602652" MODIFIED="1487395634018" TEXT="&quot;((\\&quot;)*|(?!\&quot;).*)&quot;"/>
<node CREATED="1487395642849" ID="ID_1074694357" MODIFIED="1487395643706" TEXT="([&apos;&quot;])((?!\1).)+\1"/>
</node>
</node>
</node>
</node>
</map>
