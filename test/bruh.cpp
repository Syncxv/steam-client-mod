__int64 __fastcall sub_1401EA430(__int64 a1, __int64 *a2)
{
  __int64 *v3; // r14
  int v5; // r12d
  int v6; // eax
  int v7; // r9d
  __int64 v8; // rax
  __int64 v9; // rbx
  __int64 v10; // rdi
  __int64 v11; // rdi
  unsigned __int8 (__fastcall *v12)(__int64, __int64 *); // rsi
  __int64 v13; // r8
  void (__fastcall ***v14)(_QWORD); // rcx
  __int64 v15; // r15
  __int64 v16; // rsi
  __int64 v17; // rbx
  void (__fastcall ***v18)(_QWORD); // rcx
  __int64 v19; // rdx
  __int64 v20; // rcx
  __int64 v21; // rcx
  __int64 v22; // rax
  __int64 v23; // r14
  unsigned int v24; // edi
  int v25; // ecx
  bool v26; // cf
  __int64 v27; // rax
  const int *v28; // rax
  const int *v29; // rbx
  __int64 v30; // rdx
  void (__fastcall ***v31)(_QWORD); // rcx
  __int64 v32; // rdx
  void (__fastcall ***v33)(_QWORD); // rcx
  __int64 v34; // rdx
  void (__fastcall ***v35)(_QWORD); // rcx
  unsigned int v36; // ecx
  __int64 *v37; // rax
  __int64 v38; // rax
  __int64 v39; // rdx
  void (__fastcall ***v40)(_QWORD); // rcx
  _QWORD *v41; // rax
  _QWORD *v43; // rcx
  void *v44; // rcx
  __int64 v45; // rbx
  void (__fastcall *v46)(__int64, const int **, __int64 *, _QWORD, __int64); // rdi
  void (__fastcall ***v47)(_QWORD); // rcx
  _QWORD *v48; // rax
  _QWORD *v49; // rcx
  void *v50; // rcx
  __int64 v51; // rcx
  __int64 v52; // rdx
  void (__fastcall ***v53)(_QWORD); // rcx
  __int64 v54; // rdx
  void (__fastcall ***v55)(_QWORD); // rcx
  __int64 v56; // rdx
  void (__fastcall ***v57)(_QWORD); // rcx
  __int64 v58; // rdx
  void (__fastcall ***v59)(_QWORD); // rcx
  __int64 v60; // rdx
  void (__fastcall ***v61)(_QWORD); // rcx
  __int64 v62; // rdx
  void (__fastcall ***v63)(_QWORD); // rcx
  __int64 v64; // rdx
  void (__fastcall ***v65)(_QWORD); // rcx
  __int64 v66; // rdx
  void (__fastcall ***v67)(_QWORD); // rcx
  __int64 v68; // rdx
  void (__fastcall ***v69)(_QWORD); // rcx
  __int64 v70; // rdx
  void (__fastcall ***v71)(_QWORD); // rcx
  __int64 v72; // rdx
  void (__fastcall ***v73)(_QWORD); // rcx
  __int64 v74; // rdx
  void (__fastcall ***v75)(_QWORD); // rcx
  __int64 v76; // rdx
  void (__fastcall ***v77)(_QWORD); // rcx
  __int64 v78; // rdx
  void (__fastcall ***v79)(_QWORD); // rcx
  __int64 v80; // rdx
  void (__fastcall ***v81)(_QWORD); // rcx
  __int64 v82; // rdx
  void (__fastcall ***v83)(_QWORD); // rcx
  __int64 v84; // rdx
  void (__fastcall ***v85)(_QWORD); // rcx
  __int64 v86; // rdx
  void (__fastcall ***v87)(_QWORD); // rcx
  __int64 v88; // rdx
  void (__fastcall ***v89)(_QWORD); // rcx
  __int64 v90; // rdx
  void (__fastcall ***v91)(_QWORD); // rcx
  __int64 v92; // rdx
  void (__fastcall ***v93)(_QWORD); // rcx
  __int64 v94; // rdx
  void (__fastcall ***v95)(_QWORD); // rcx
  __int64 v96; // rdx
  void (__fastcall ***v97)(_QWORD); // rcx
  __int64 v98; // rdx
  void (__fastcall ***v99)(_QWORD); // rcx
  __int64 v100; // rdx
  void (__fastcall ***v101)(_QWORD); // rcx
  __int64 v102; // rdx
  void (__fastcall ***v103)(_QWORD); // rcx
  __int64 v104; // rdx
  void (__fastcall ***v105)(_QWORD); // rcx
  __int64 v106; // rdx
  void (__fastcall ***v107)(_QWORD); // rcx
  __int64 v108; // rdx
  void (__fastcall ***v109)(_QWORD); // rcx
  __int64 v110; // rdx
  void (__fastcall ***v111)(_QWORD); // rcx
  __int64 v112; // rdx
  void (__fastcall ***v113)(_QWORD); // rcx
  __int64 v114; // rdx
  void (__fastcall ***v115)(_QWORD); // rcx
  __int64 v116; // rdx
  void (__fastcall ***v117)(_QWORD); // rcx
  __int64 v118; // rdx
  void (__fastcall ***v119)(_QWORD); // rcx
  __int64 v120; // rdx
  void (__fastcall ***v121)(_QWORD); // rcx
  __int64 v122; // rdx
  void (__fastcall ***v123)(_QWORD); // rcx
  __int64 v124; // rdx
  void (__fastcall ***v125)(_QWORD); // rcx
  __int64 v126; // rdx
  void (__fastcall ***v127)(_QWORD); // rcx
  __int64 v128; // rdx
  void (__fastcall ***v129)(_QWORD); // rcx
  __int64 v130; // rdx
  void (__fastcall ***v131)(_QWORD); // rcx
  __int64 v132; // rdx
  void (__fastcall ***v133)(_QWORD); // rcx
  __int64 v134; // rdx
  void (__fastcall ***v135)(_QWORD); // rcx
  __int64 v136; // rdx
  void (__fastcall ***v137)(_QWORD); // rcx
  __int64 v138; // rdx
  void (__fastcall ***v139)(_QWORD); // rcx
  __int64 v140; // rdx
  void (__fastcall ***v141)(_QWORD); // rcx
  __int64 v142; // rdx
  void (__fastcall ***v143)(_QWORD); // rcx
  __int64 v144; // rdx
  void (__fastcall ***v145)(_QWORD); // rcx
  __int64 v146; // rdx
  void (__fastcall ***v147)(_QWORD); // rcx
  __int64 v148; // rdx
  void (__fastcall ***v149)(_QWORD); // rcx
  __int64 v150; // rdx
  void (__fastcall ***v151)(_QWORD); // rcx
  __int64 v152; // rdx
  void (__fastcall ***v153)(_QWORD); // rcx
  __int64 v154; // rdx
  void (__fastcall ***v155)(_QWORD); // rcx
  __int64 v156; // rdx
  void (__fastcall ***v157)(_QWORD); // rcx
  __int64 v158; // rdx
  void (__fastcall ***v159)(_QWORD); // rcx
  __int64 v160; // rdx
  void (__fastcall ***v161)(_QWORD); // rcx
  __int64 v162; // rdx
  void (__fastcall ***v163)(_QWORD); // rcx
  __int64 v164; // rdx
  void (__fastcall ***v165)(_QWORD); // rcx
  __int64 v166; // rdx
  void (__fastcall ***v167)(_QWORD); // rcx
  __int64 v168; // rdx
  void (__fastcall ***v169)(_QWORD); // rcx
  __int64 v170; // rdx
  void (__fastcall ***v171)(_QWORD); // rcx
  __int64 v172; // rdx
  void (__fastcall ***v173)(_QWORD); // rcx
  __int64 v174; // rdx
  void (__fastcall ***v175)(_QWORD); // rcx
  __int64 v176; // rdx
  void (__fastcall ***v177)(_QWORD); // rcx
  __int64 v178; // rdx
  void (__fastcall ***v179)(_QWORD); // rcx
  __int64 v180; // rdx
  void (__fastcall ***v181)(_QWORD); // rcx
  __int64 v182; // rdx
  void (__fastcall ***v183)(_QWORD); // rcx
  __int64 v184; // rdx
  void (__fastcall ***v185)(_QWORD); // rcx
  __int64 v186; // rdx
  void (__fastcall ***v187)(_QWORD); // rcx
  __int64 v188; // rdx
  void (__fastcall ***v189)(_QWORD); // rcx
  __int64 v190; // rdx
  void (__fastcall ***v191)(_QWORD); // rcx
  __int64 v192; // rdx
  void (__fastcall ***v193)(_QWORD); // rcx
  __int64 v194; // rdx
  void (__fastcall ***v195)(_QWORD); // rcx
  __int64 v196; // rdx
  void (__fastcall ***v197)(_QWORD); // rcx
  __int64 v198; // rdx
  void (__fastcall ***v199)(_QWORD); // rcx
  __int64 v200; // rdx
  void (__fastcall ***v201)(_QWORD); // rcx
  __int64 v202; // rdx
  void (__fastcall ***v203)(_QWORD); // rcx
  __int64 v204; // rdx
  void (__fastcall ***v205)(_QWORD); // rcx
  __int64 v206; // rdx
  void (__fastcall ***v207)(_QWORD); // rcx
  __int64 v208; // rdx
  void (__fastcall ***v209)(_QWORD); // rcx
  __int64 v210; // rdx
  void (__fastcall ***v211)(_QWORD); // rcx
  __int64 v212; // rdx
  void (__fastcall ***v213)(_QWORD); // rcx
  __int64 v214; // rdx
  void (__fastcall ***v215)(_QWORD); // rcx
  __int64 v216; // rdx
  void (__fastcall ***v217)(_QWORD); // rcx
  __int64 v218; // rdx
  void (__fastcall ***v219)(_QWORD); // rcx
  __int64 v220; // rdx
  void (__fastcall ***v221)(_QWORD); // rcx
  __int64 v222; // rdx
  void (__fastcall ***v223)(_QWORD); // rcx
  __int64 v224; // rdx
  void (__fastcall ***v225)(_QWORD); // rcx
  __int64 v226; // rdx
  void (__fastcall ***v227)(_QWORD); // rcx
  __int64 v228; // rdx
  void (__fastcall ***v229)(_QWORD); // rcx
  __int64 v230; // rdx
  void (__fastcall ***v231)(_QWORD); // rcx
  __int64 v232; // rdx
  void (__fastcall ***v233)(_QWORD); // rcx
  __int64 v234; // rdx
  void (__fastcall ***v235)(_QWORD); // rcx
  __int64 v236; // rdx
  void (__fastcall ***v237)(_QWORD); // rcx
  __int64 v238; // rdx
  void (__fastcall ***v239)(_QWORD); // rcx
  __int64 v240; // rdx
  void (__fastcall ***v241)(_QWORD); // rcx
  __int64 v242; // rdx
  void (__fastcall ***v243)(_QWORD); // rcx
  __int64 v244; // rdx
  void (__fastcall ***v245)(_QWORD); // rcx
  __int64 v246; // rdx
  void (__fastcall ***v247)(_QWORD); // rcx
  __int64 v248; // rdx
  void (__fastcall ***v249)(_QWORD); // rcx
  __int64 v250; // rdx
  void (__fastcall ***v251)(_QWORD); // rcx
  __int64 v252; // rdx
  void (__fastcall ***v253)(_QWORD); // rcx
  __int64 v254; // rdx
  void (__fastcall ***v255)(_QWORD); // rcx
  __int64 v256; // rdx
  void (__fastcall ***v257)(_QWORD); // rcx
  __int64 v258; // rdx
  void (__fastcall ***v259)(_QWORD); // rcx
  __int64 v260; // rdx
  void (__fastcall ***v261)(_QWORD); // rcx
  __int64 v262; // rdx
  void (__fastcall ***v263)(_QWORD); // rcx
  __int64 v264; // rdx
  void (__fastcall ***v265)(_QWORD); // rcx
  __int64 v266; // rdx
  void (__fastcall ***v267)(_QWORD); // rcx
  __int64 v268; // rdx
  void (__fastcall ***v269)(_QWORD); // rcx
  __int64 v270; // rdx
  void (__fastcall ***v271)(_QWORD); // rcx
  __int64 v272; // rdx
  void (__fastcall ***v273)(_QWORD); // rcx
  __int64 v274; // rdx
  void (__fastcall ***v275)(_QWORD); // rcx
  __int64 v276; // rdx
  void (__fastcall ***v277)(_QWORD); // rcx
  __int64 v278; // rdx
  void (__fastcall ***v279)(_QWORD); // rcx
  __int64 v280; // rdx
  void (__fastcall ***v281)(_QWORD); // rcx
  __int64 v282; // rdx
  void (__fastcall ***v283)(_QWORD); // rcx
  __int64 v284; // rdx
  void (__fastcall ***v285)(_QWORD); // rcx
  __int64 v286; // rdx
  void (__fastcall ***v287)(_QWORD); // rcx
  __int64 v288; // rdx
  void (__fastcall ***v289)(_QWORD); // rcx
  __int64 v290; // rdx
  void (__fastcall ***v291)(_QWORD); // rcx
  __int64 v292; // rdx
  void (__fastcall ***v293)(_QWORD); // rcx
  __int64 v294; // rdx
  void (__fastcall ***v295)(_QWORD); // rcx
  __int64 v296; // rdx
  void (__fastcall ***v297)(_QWORD); // rcx
  __int64 v298; // rdx
  void (__fastcall ***v299)(_QWORD); // rcx
  __int64 v300; // rdx
  void (__fastcall ***v301)(_QWORD); // rcx
  __int64 v302; // rdx
  void (__fastcall ***v303)(_QWORD); // rcx
  __int64 v304; // rdx
  void (__fastcall ***v305)(_QWORD); // rcx
  __int64 v306; // rdx
  void (__fastcall ***v307)(_QWORD); // rcx
  __int64 v308; // rdx
  void (__fastcall ***v309)(_QWORD); // rcx
  __int64 v310; // rdx
  void (__fastcall ***v311)(_QWORD); // rcx
  __int64 v312; // rdx
  void (__fastcall ***v313)(_QWORD); // rcx
  __int64 v314; // rdx
  void (__fastcall ***v315)(_QWORD); // rcx
  __int64 v316; // rdx
  void (__fastcall ***v317)(_QWORD); // rcx
  __int64 v318; // rdx
  void (__fastcall ***v319)(_QWORD); // rcx
  __int64 v320; // rdx
  void (__fastcall ***v321)(_QWORD); // rcx
  __int64 v322; // rbx
  __int64 v323; // rcx
  __int64 *v324; // rbx
  __int64 v325; // rbx
  void (__fastcall *v326)(__int64, const int **, __int64 *, _QWORD, __int64); // rdi
  __int64 v327; // rdx
  void (__fastcall ***v328)(_QWORD); // rcx
  _BYTE *v329; // rcx
  __int64 v330; // rcx
  __int64 result; // rax
  __int64 v332; // rcx
  __int64 v333; // [rsp+20h] [rbp-E0h] BYREF
  int v334; // [rsp+28h] [rbp-D8h]
  _QWORD v335[2]; // [rsp+30h] [rbp-D0h] BYREF
  __int64 v336; // [rsp+40h] [rbp-C0h]
  unsigned __int64 v337; // [rsp+48h] [rbp-B8h]
  _QWORD v338[2]; // [rsp+50h] [rbp-B0h] BYREF
  __int64 v339; // [rsp+60h] [rbp-A0h]
  unsigned __int64 v340; // [rsp+68h] [rbp-98h]
  const int *v341; // [rsp+70h] [rbp-90h] BYREF
  void *Block; // [rsp+78h] [rbp-88h]
  char v343; // [rsp+80h] [rbp-80h]
  const int *v344; // [rsp+88h] [rbp-78h] BYREF
  void *v345; // [rsp+90h] [rbp-70h]
  char v346; // [rsp+98h] [rbp-68h]
  _BYTE *v347; // [rsp+A0h] [rbp-60h] BYREF
  char v348[8]; // [rsp+A8h] [rbp-58h] BYREF
  __int64 v349; // [rsp+B0h] [rbp-50h]
  unsigned __int64 v350; // [rsp+B8h] [rbp-48h]
  const int *v351; // [rsp+C0h] [rbp-40h] BYREF
  void *v352; // [rsp+C8h] [rbp-38h]
  char v353; // [rsp+D0h] [rbp-30h]
  __int64 v354; // [rsp+D8h] [rbp-28h] BYREF
  __int64 v355; // [rsp+E0h] [rbp-20h] BYREF
  __int64 v356; // [rsp+E8h] [rbp-18h] BYREF
  __int64 v357; // [rsp+F0h] [rbp-10h] BYREF
  __int64 v358; // [rsp+F8h] [rbp-8h] BYREF
  __int64 v359; // [rsp+100h] [rbp+0h] BYREF
  __int64 v360; // [rsp+108h] [rbp+8h] BYREF
  __int64 v361; // [rsp+110h] [rbp+10h] BYREF
  __int64 v362; // [rsp+118h] [rbp+18h] BYREF
  __int64 v363; // [rsp+120h] [rbp+20h] BYREF
  __int64 v364; // [rsp+128h] [rbp+28h] BYREF
  __int64 v365; // [rsp+130h] [rbp+30h] BYREF
  __int64 v366; // [rsp+138h] [rbp+38h] BYREF
  __int64 v367; // [rsp+140h] [rbp+40h] BYREF
  __int64 v368; // [rsp+148h] [rbp+48h] BYREF
  __int64 v369; // [rsp+150h] [rbp+50h] BYREF
  __int64 v370; // [rsp+158h] [rbp+58h] BYREF
  __int64 v371; // [rsp+160h] [rbp+60h] BYREF
  __int64 v372; // [rsp+168h] [rbp+68h] BYREF
  __int64 v373; // [rsp+170h] [rbp+70h] BYREF
  __int64 v374; // [rsp+178h] [rbp+78h] BYREF
  __int64 v375; // [rsp+180h] [rbp+80h] BYREF
  __int64 v376; // [rsp+188h] [rbp+88h] BYREF
  __int64 v377; // [rsp+190h] [rbp+90h] BYREF
  __int64 v378; // [rsp+198h] [rbp+98h] BYREF
  __int64 v379; // [rsp+1A0h] [rbp+A0h] BYREF
  __int64 v380; // [rsp+1A8h] [rbp+A8h] BYREF
  __int64 v381; // [rsp+1B0h] [rbp+B0h] BYREF
  __int64 v382; // [rsp+1B8h] [rbp+B8h] BYREF
  __int64 v383; // [rsp+1C0h] [rbp+C0h] BYREF
  __int64 v384; // [rsp+1C8h] [rbp+C8h] BYREF
  __int64 v385; // [rsp+1D0h] [rbp+D0h] BYREF
  __int64 v386; // [rsp+1D8h] [rbp+D8h] BYREF
  __int64 v387; // [rsp+1E0h] [rbp+E0h] BYREF
  __int64 v388; // [rsp+1E8h] [rbp+E8h] BYREF
  __int64 v389; // [rsp+1F0h] [rbp+F0h] BYREF
  __int64 v390; // [rsp+1F8h] [rbp+F8h] BYREF
  __int64 v391; // [rsp+200h] [rbp+100h] BYREF
  __int64 v392; // [rsp+208h] [rbp+108h] BYREF
  __int64 v393; // [rsp+210h] [rbp+110h] BYREF
  __int64 v394; // [rsp+218h] [rbp+118h] BYREF
  __int64 v395; // [rsp+220h] [rbp+120h] BYREF
  __int64 v396; // [rsp+228h] [rbp+128h] BYREF
  __int64 v397; // [rsp+230h] [rbp+130h] BYREF
  __int64 v398; // [rsp+238h] [rbp+138h] BYREF
  __int64 v399; // [rsp+240h] [rbp+140h] BYREF
  __int64 v400; // [rsp+248h] [rbp+148h] BYREF
  __int64 v401; // [rsp+250h] [rbp+150h] BYREF
  __int64 v402; // [rsp+258h] [rbp+158h] BYREF
  __int64 v403; // [rsp+260h] [rbp+160h] BYREF
  __int64 v404; // [rsp+268h] [rbp+168h] BYREF
  __int64 v405; // [rsp+270h] [rbp+170h] BYREF
  __int64 v406; // [rsp+278h] [rbp+178h] BYREF
  __int64 v407; // [rsp+280h] [rbp+180h] BYREF
  __int64 v408; // [rsp+288h] [rbp+188h] BYREF
  __int64 v409; // [rsp+290h] [rbp+190h] BYREF
  __int64 v410; // [rsp+298h] [rbp+198h] BYREF
  __int64 v411; // [rsp+2A0h] [rbp+1A0h] BYREF
  __int64 v412; // [rsp+2A8h] [rbp+1A8h] BYREF
  __int64 v413; // [rsp+2B0h] [rbp+1B0h] BYREF
  __int64 v414; // [rsp+2B8h] [rbp+1B8h] BYREF
  __int64 v415; // [rsp+2C0h] [rbp+1C0h] BYREF
  __int64 v416; // [rsp+2C8h] [rbp+1C8h] BYREF
  __int64 v417; // [rsp+2D0h] [rbp+1D0h] BYREF
  __int64 v418; // [rsp+2D8h] [rbp+1D8h] BYREF
  __int64 v419; // [rsp+2E0h] [rbp+1E0h] BYREF
  __int64 v420; // [rsp+2E8h] [rbp+1E8h] BYREF
  __int64 v421; // [rsp+2F0h] [rbp+1F0h] BYREF
  __int64 v422; // [rsp+2F8h] [rbp+1F8h] BYREF
  __int64 v423; // [rsp+300h] [rbp+200h] BYREF
  __int64 v424; // [rsp+308h] [rbp+208h] BYREF
  __int64 v425; // [rsp+310h] [rbp+210h] BYREF
  __int64 v426; // [rsp+318h] [rbp+218h] BYREF
  __int64 v427; // [rsp+320h] [rbp+220h] BYREF
  __int64 v428; // [rsp+328h] [rbp+228h] BYREF
  __int64 v429; // [rsp+330h] [rbp+230h] BYREF
  __int64 v430; // [rsp+338h] [rbp+238h] BYREF
  __int64 v431; // [rsp+340h] [rbp+240h] BYREF
  __int64 v432; // [rsp+348h] [rbp+248h] BYREF
  __int64 v433; // [rsp+350h] [rbp+250h] BYREF
  __int64 v434; // [rsp+358h] [rbp+258h] BYREF
  __int64 v435; // [rsp+360h] [rbp+260h] BYREF
  __int64 v436; // [rsp+368h] [rbp+268h] BYREF
  __int64 v437; // [rsp+370h] [rbp+270h] BYREF
  __int64 v438; // [rsp+378h] [rbp+278h] BYREF
  __int64 v439; // [rsp+380h] [rbp+280h] BYREF
  __int64 v440; // [rsp+388h] [rbp+288h] BYREF
  __int64 v441; // [rsp+390h] [rbp+290h] BYREF
  __int64 v442; // [rsp+398h] [rbp+298h] BYREF
  __int64 v443; // [rsp+3A0h] [rbp+2A0h] BYREF
  __int64 v444; // [rsp+3A8h] [rbp+2A8h]
  __int64 v445; // [rsp+3B0h] [rbp+2B0h] BYREF
  __int64 v446; // [rsp+3B8h] [rbp+2B8h] BYREF
  __int64 v447; // [rsp+3C0h] [rbp+2C0h] BYREF
  __int64 v448; // [rsp+3C8h] [rbp+2C8h] BYREF
  __int64 v449; // [rsp+3D0h] [rbp+2D0h] BYREF
  __int64 v450; // [rsp+3D8h] [rbp+2D8h] BYREF
  __int64 v451; // [rsp+3E0h] [rbp+2E0h] BYREF
  __int64 v452; // [rsp+3E8h] [rbp+2E8h] BYREF
  __int64 v453[145]; // [rsp+3F0h] [rbp+2F0h] BYREF
  char v454[256]; // [rsp+878h] [rbp+778h] BYREF
  char v455[256]; // [rsp+978h] [rbp+878h] BYREF
  char v456[256]; // [rsp+A78h] [rbp+978h] BYREF
  char v457[256]; // [rsp+B78h] [rbp+A78h] BYREF
  char v458[256]; // [rsp+C78h] [rbp+B78h] BYREF
  char v459[256]; // [rsp+D78h] [rbp+C78h] BYREF
  char v460[256]; // [rsp+E78h] [rbp+D78h] BYREF
  char v461[328]; // [rsp+F78h] [rbp+E78h] BYREF
  int v462; // [rsp+10D0h] [rbp+FD0h]
  __int64 *v464; // [rsp+10E0h] [rbp+FE0h] BYREF
  __int64 v465; // [rsp+10E8h] [rbp+FE8h] BYREF

  v3 = a2;
  v5 = 0;
  v334 = 0;
  v6 = (*(__int64 (__fastcall **)(__int64))(*(_QWORD *)*a2 + 72i64))(*a2);
  sub_1401EFFC0(a1, (int)&v464, v6, v7, v333, 0, v335[0], v335[1], v336, v337, v338[0], (void *)v338[1]);
  if ( (!v464 || !*v464)
    && !(unsigned __int8)sub_1402B2FD0(
                           "c:\\buildslave\\steam_rel_client_hotfix_win64\\build\\src\\webhelper\\webhelperv8.cpp",
                           575i64,
                           "pBrowserData.GetPtr()") )
  {
    __debugbreak();
  }
  v462 = 0;
  if ( *(int *)(a1 + 96) > 0 )
  {
    v8 = 0i64;
    v444 = 0i64;
    do
    {
      v9 = 32 * v8;
      v10 = *(_QWORD *)(a1 + 80);
      if ( (v5 & 2) != 0 )
      {
        v5 &= ~2u;
        v334 = v5;
        *(double *)&_XMM0 = sub_140089774(v454);
      }
      v11 = *(_QWORD *)(v10 + v9);
      v12 = *(unsigned __int8 (__fastcall **)(__int64, __int64 *))(*(_QWORD *)v11 + 80i64);
      v453[139] = (__int64)&v465;
      v13 = *v3;
      v465 = v13;
      if ( v13 )
      {
        v14 = (void (__fastcall ***)(_QWORD))(*(int *)(*(_QWORD *)(v13 + 8) + 4i64) + v13 + 8);
        (**v14)(v14);
      }
      if ( v12(v11, &v465) )
      {
        v15 = v9 + *(_QWORD *)(a1 + 80);
        if ( (v5 & 4) != 0 )
        {
          v5 &= ~4u;
          v334 = v5;
          *(double *)&_XMM0 = sub_140089774(v455);
        }
        (*(void (__fastcall **)(_QWORD))(**(_QWORD **)(v15 + 16) + 40i64))(*(_QWORD *)(v15 + 16));
        v16 = 0i64;
        if ( !*(_QWORD *)(v15 + 24) )
        {
          v453[140] = (__int64)&v333;
          v333 = 0i64;
          v453[141] = (__int64)&v427;
          v427 = 0i64;
          v17 = *(_QWORD *)sub_14008B0F0(&v451, &v427, &v333);
          if ( v17 )
          {
            v18 = (void (__fastcall ***)(_QWORD))(v17 + *(int *)(*(_QWORD *)(v17 + 8) + 4i64) + 8i64);
            (**v18)(v18);
          }
          v19 = *(_QWORD *)(v15 + 24);
          *(_QWORD *)(v15 + 24) = v17;
          if ( v19 )
          {
            v20 = v19 + 8 + *(int *)(*(_QWORD *)(v19 + 8) + 4i64);
            (*(void (__fastcall **)(__int64))(*(_QWORD *)v20 + 8i64))(v20);
          }
          if ( v451 )
          {
            v21 = *(int *)(*(_QWORD *)(v451 + 8) + 4i64) + v451 + 8;
            (*(void (__fastcall **)(__int64))(*(_QWORD *)v21 + 8i64))(v21);
          }
          if ( !*(_QWORD *)(v15 + 24)
            && !(unsigned __int8)sub_1402B2FD0(
                                   "c:\\buildslave\\steam_rel_client_hotfix_win64\\build\\src\\webhelper\\webhelperv8.cpp",
                                   589i64,
                                   "data.m_pSteamObject.get()") )
          {
            __debugbreak();
          }
        }
        v22 = (__int64)v464;
        v23 = *v464;
        v24 = 0;
        v25 = *(_DWORD *)(*v464 + 88);
        if ( v25 > 0 )
        {
          v26 = v25 != 0;
          do
          {
            if ( v26 )
            {
              v27 = *(_QWORD *)(v23 + 64);
              if ( *(int *)(v27 + v16 + 12) >= -1 )
              {
                v28 = *(const int **)(v27 + v16);
                v29 = &unk_140463C5D;
                if ( v28 )
                  v29 = v28;
                v453[142] = (__int64)&v333;
                v30 = *(_QWORD *)(v15 + 16);
                v333 = v30;
                if ( v30 )
                {
                  v31 = (void (__fastcall ***)(_QWORD))(v30 + 8 + *(int *)(*(_QWORD *)(v30 + 8) + 4i64));
                  (**v31)(v31);
                }
                v453[143] = (__int64)&v445;
                v32 = *(_QWORD *)(a1 + 104);
                v445 = v32;
                if ( v32 )
                {
                  v33 = (void (__fastcall ***)(_QWORD))(v32 + 8 + *(int *)(*(_QWORD *)(v32 + 8) + 4i64));
                  (**v33)(v33);
                }
                v453[144] = (__int64)&v446;
                v34 = *(_QWORD *)(v15 + 24);
                v446 = v34;
                if ( v34 )
                {
                  v35 = (void (__fastcall ***)(_QWORD))(v34 + 8 + *(int *)(*(_QWORD *)(v34 + 8) + 4i64));
                  (**v35)(v35);
                }
                ((void (__fastcall *)(__int64 *, __int64 *, const int *, __int64 *))sub_1401DE240)(
                  &v446,
                  &v445,
                  v29,
                  &v333);
              }
            }
            ++v24;
            v16 += 16i64;
            v36 = *(_DWORD *)(v23 + 88);
            v26 = v24 < v36;
          }
          while ( (int)v24 < (int)v36 );
          v22 = (__int64)v464;
        }
        v37 = *(__int64 **)(*(_QWORD *)v22 + 112i64);
        if ( v37 )
          v38 = *v37;
        else
          v38 = 0i64;
        if ( v38 )
        {
          v453[1] = (__int64)&v333;
          v39 = *(_QWORD *)(a1 + 104);
          v333 = v39;
          if ( v39 )
          {
            v40 = (void (__fastcall ***)(_QWORD))(v39 + 8 + *(int *)(*(_QWORD *)(v39 + 8) + 4i64));
            (**v40)(v40);
          }
          v341 = &CefStringBase<CefStringTraitsUTF8>::`vftable';
          Block = 0i64;
          v343 = 0;
          v337 = 15i64;
          v336 = 8i64;
          strcpy((char *)v335, "Localize");
          v41 = operator new(0x18ui64);
          Block = v41;
          __asm { xorps   xmm0, xmm0 }
          *(_OWORD *)v41 = _XMM0;
          v41[2] = 0i64;
          v343 = 1;
          v43 = v335;
          if ( v337 >= 0x10 )
            v43 = (_QWORD *)v335[0];
          cef_string_utf8_set(v43, v336, Block, 1i64);
          if ( v337 >= 0x10 )
          {
            v44 = (void *)v335[0];
            if ( v337 + 1 >= 0x1000 )
            {
              v44 = *(void **)(v335[0] - 8i64);
              if ( (unsigned __int64)(v335[0] - (_QWORD)v44 - 8i64) > 0x1F )
                invalid_parameter_noinfo_noreturn();
            }
            j_j_free(v44);
          }
          v336 = 0i64;
          v337 = 15i64;
          LOBYTE(v335[0]) = 0;
          sub_14008B3D0(&v448, &v341, &v333);
          v341 = &CefStringBase<CefStringTraitsUTF8>::`vftable';
          if ( Block )
          {
            if ( v343 )
            {
              cef_string_utf8_clear(Block);
              j_j_free(Block);
            }
            Block = 0i64;
            v343 = 0;
          }
          if ( (v5 & 8) != 0 )
          {
            v5 &= ~8u;
            v334 = v5;
            *(double *)&_XMM0 = sub_140089774(v456);
          }
          v45 = *(_QWORD *)(v15 + 24);
          v46 = *(void (__fastcall **)(__int64, const int **, __int64 *, _QWORD, __int64))(*(_QWORD *)v45 + 272i64);
          v453[2] = (__int64)&v447;
          v447 = v448;
          if ( v448 )
          {
            v47 = (void (__fastcall ***)(_QWORD))(*(int *)(*(_QWORD *)(v448 + 8) + 4i64) + v448 + 8);
            (**v47)(v47);
          }
          v344 = &CefStringBase<CefStringTraitsUTF8>::`vftable';
          v345 = 0i64;
          v346 = 0;
          v340 = 15i64;
          v339 = 8i64;
          strcpy((char *)v338, "Localize");
          v48 = operator new(0x18ui64);
          v345 = v48;
          __asm { xorps   xmm0, xmm0 }
          *(_OWORD *)v48 = _XMM0;
          v48[2] = 0i64;
          v346 = 1;
          v49 = v338;
          if ( v340 >= 0x10 )
            v49 = (_QWORD *)v338[0];
          cef_string_utf8_set(v49, v339, v345, 1i64);
          if ( v340 >= 0x10 )
          {
            v50 = (void *)v338[0];
            if ( v340 + 1 >= 0x1000 )
            {
              v50 = *(void **)(v338[0] - 8i64);
              if ( (unsigned __int64)(v338[0] - (_QWORD)v50 - 8i64) > 0x1F )
                invalid_parameter_noinfo_noreturn();
            }
            j_j_free(v50);
          }
          v339 = 0i64;
          v340 = 15i64;
          LOBYTE(v338[0]) = 0;
          v46(v45, &v344, &v447, 0i64, v333);
          v344 = &CefStringBase<CefStringTraitsUTF8>::`vftable';
          if ( v345 )
          {
            if ( v346 )
            {
              cef_string_utf8_clear(v345);
              j_j_free(v345);
            }
            v345 = 0i64;
            v346 = 0;
          }
          if ( v448 )
          {
            v51 = *(int *)(*(_QWORD *)(v448 + 8) + 4i64) + v448 + 8;
            (*(void (__fastcall **)(__int64))(*(_QWORD *)v51 + 8i64))(v51);
          }
        }
        v453[3] = (__int64)&v333;
        v52 = *(_QWORD *)(v15 + 16);
        v333 = v52;
        if ( v52 )
        {
          v53 = (void (__fastcall ***)(_QWORD))(v52 + 8 + *(int *)(*(_QWORD *)(v52 + 8) + 4i64));
          (**v53)(v53);
        }
        v453[4] = (__int64)&v449;
        v54 = *(_QWORD *)(a1 + 104);
        v449 = v54;
        if ( v54 )
        {
          v55 = (void (__fastcall ***)(_QWORD))(v54 + 8 + *(int *)(*(_QWORD *)(v54 + 8) + 4i64));
          (**v55)(v55);
        }
        v453[5] = (__int64)&v354;
        v56 = *(_QWORD *)(v15 + 24);
        v354 = v56;
        if ( v56 )
        {
          v57 = (void (__fastcall ***)(_QWORD))(v56 + 8 + *(int *)(*(_QWORD *)(v56 + 8) + 4i64));
          (**v57)(v57);
        }
        ((void (__fastcall *)(__int64 *, __int64 *, const char *, __int64 *))sub_1401DE240)(
          &v354,
          &v449,
          "_internal.ExecutePromise",
          &v333);
        v453[6] = (__int64)&v333;
        v58 = *(_QWORD *)(v15 + 16);
        v333 = v58;
        if ( v58 )
        {
          v59 = (void (__fastcall ***)(_QWORD))(v58 + 8 + *(int *)(*(_QWORD *)(v58 + 8) + 4i64));
          (**v59)(v59);
        }
        v453[7] = (__int64)&v355;
        v60 = *(_QWORD *)(a1 + 104);
        v355 = v60;
        if ( v60 )
        {
          v61 = (void (__fastcall ***)(_QWORD))(v60 + 8 + *(int *)(*(_QWORD *)(v60 + 8) + 4i64));
          (**v61)(v61);
        }
        v453[8] = (__int64)&v356;
        v62 = *(_QWORD *)(v15 + 24);
        v356 = v62;
        if ( v62 )
        {
          v63 = (void (__fastcall ***)(_QWORD))(v62 + 8 + *(int *)(*(_QWORD *)(v62 + 8) + 4i64));
          (**v63)(v63);
        }
        ((void (__fastcall *)(__int64 *, __int64 *, const char *, __int64 *))sub_1401DE240)(
          &v356,
          &v355,
          "_internal.GetFrameRateLimit",
          &v333);
        v453[9] = (__int64)&v333;
        v64 = *(_QWORD *)(v15 + 16);
        v333 = v64;
        if ( v64 )
        {
          v65 = (void (__fastcall ***)(_QWORD))(v64 + 8 + *(int *)(*(_QWORD *)(v64 + 8) + 4i64));
          (**v65)(v65);
        }
        v453[10] = (__int64)&v357;
        v66 = *(_QWORD *)(a1 + 104);
        v357 = v66;
        if ( v66 )
        {
          v67 = (void (__fastcall ***)(_QWORD))(v66 + 8 + *(int *)(*(_QWORD *)(v66 + 8) + 4i64));
          (**v67)(v67);
        }
        v453[11] = (__int64)&v358;
        v68 = *(_QWORD *)(v15 + 24);
        v358 = v68;
        if ( v68 )
        {
          v69 = (void (__fastcall ***)(_QWORD))(v68 + 8 + *(int *)(*(_QWORD *)(v68 + 8) + 4i64));
          (**v69)(v69);
        }
        ((void (__fastcall *)(__int64 *, __int64 *, const char *, __int64 *))sub_1401DE240)(
          &v358,
          &v357,
          "_internal.GetDisplayScaleFactors",
          &v333);
        v453[12] = (__int64)&v333;
        v70 = *(_QWORD *)(v15 + 16);
        v333 = v70;
        if ( v70 )
        {
          v71 = (void (__fastcall ***)(_QWORD))(v70 + 8 + *(int *)(*(_QWORD *)(v70 + 8) + 4i64));
          (**v71)(v71);
        }
        v453[13] = (__int64)&v359;
        v72 = *(_QWORD *)(a1 + 104);
        v359 = v72;
        if ( v72 )
        {
          v73 = (void (__fastcall ***)(_QWORD))(v72 + 8 + *(int *)(*(_QWORD *)(v72 + 8) + 4i64));
          (**v73)(v73);
        }
        v453[14] = (__int64)&v360;
        v74 = *(_QWORD *)(v15 + 24);
        v360 = v74;
        if ( v74 )
        {
          v75 = (void (__fastcall ***)(_QWORD))(v74 + 8 + *(int *)(*(_QWORD *)(v74 + 8) + 4i64));
          (**v75)(v75);
        }
        ((void (__fastcall *)(__int64 *, __int64 *, const char *, __int64 *))sub_1401DE240)(
          &v360,
          &v359,
          "_internal.SetForceDeviceScaleFactor",
          &v333);
        v453[15] = (__int64)&v333;
        v76 = *(_QWORD *)(v15 + 16);
        v333 = v76;
        if ( v76 )
        {
          v77 = (void (__fastcall ***)(_QWORD))(v76 + 8 + *(int *)(*(_QWORD *)(v76 + 8) + 4i64));
          (**v77)(v77);
        }
        v453[16] = (__int64)&v361;
        v78 = *(_QWORD *)(a1 + 104);
        v361 = v78;
        if ( v78 )
        {
          v79 = (void (__fastcall ***)(_QWORD))(v78 + 8 + *(int *)(*(_QWORD *)(v78 + 8) + 4i64));
          (**v79)(v79);
        }
        v453[17] = (__int64)&v362;
        v80 = *(_QWORD *)(v15 + 24);
        v362 = v80;
        if ( v80 )
        {
          v81 = (void (__fastcall ***)(_QWORD))(v80 + 8 + *(int *)(*(_QWORD *)(v80 + 8) + 4i64));
          (**v81)(v81);
        }
        ((void (__fastcall *)(__int64 *, __int64 *, const char *, __int64 *))sub_1401DE240)(
          &v362,
          &v361,
          "_internal.Paste",
          &v333);
        v453[18] = (__int64)&v333;
        v82 = *(_QWORD *)(v15 + 16);
        v333 = v82;
        if ( v82 )
        {
          v83 = (void (__fastcall ***)(_QWORD))(v82 + 8 + *(int *)(*(_QWORD *)(v82 + 8) + 4i64));
          (**v83)(v83);
        }
        v453[19] = (__int64)&v363;
        v84 = *(_QWORD *)(a1 + 104);
        v363 = v84;
        if ( v84 )
        {
          v85 = (void (__fastcall ***)(_QWORD))(v84 + 8 + *(int *)(*(_QWORD *)(v84 + 8) + 4i64));
          (**v85)(v85);
        }
        v453[20] = (__int64)&v364;
        v86 = *(_QWORD *)(v15 + 24);
        v364 = v86;
        if ( v86 )
        {
          v87 = (void (__fastcall ***)(_QWORD))(v86 + 8 + *(int *)(*(_QWORD *)(v86 + 8) + 4i64));
          (**v87)(v87);
        }
        ((void (__fastcall *)(__int64 *, __int64 *, const char *, __int64 *))sub_1401DE240)(
          &v364,
          &v363,
          "_internal.GetSpellingSuggestions",
          &v333);
        v453[21] = (__int64)&v333;
        v88 = *(_QWORD *)(v15 + 16);
        v333 = v88;
        if ( v88 )
        {
          v89 = (void (__fastcall ***)(_QWORD))(v88 + 8 + *(int *)(*(_QWORD *)(v88 + 8) + 4i64));
          (**v89)(v89);
        }
        v453[22] = (__int64)&v365;
        v90 = *(_QWORD *)(a1 + 104);
        v365 = v90;
        if ( v90 )
        {
          v91 = (void (__fastcall ***)(_QWORD))(v90 + 8 + *(int *)(*(_QWORD *)(v90 + 8) + 4i64));
          (**v91)(v91);
        }
        v453[23] = (__int64)&v366;
        v92 = *(_QWORD *)(v15 + 24);
        v366 = v92;
        if ( v92 )
        {
          v93 = (void (__fastcall ***)(_QWORD))(v92 + 8 + *(int *)(*(_QWORD *)(v92 + 8) + 4i64));
          (**v93)(v93);
        }
        ((void (__fastcall *)(__int64 *, __int64 *, const char *, __int64 *))sub_1401DE240)(
          &v366,
          &v365,
          "_internal.ReplaceMisspelling",
          &v333);
        v453[24] = (__int64)&v333;
        v94 = *(_QWORD *)(v15 + 16);
        v333 = v94;
        if ( v94 )
        {
          v95 = (void (__fastcall ***)(_QWORD))(v94 + 8 + *(int *)(*(_QWORD *)(v94 + 8) + 4i64));
          (**v95)(v95);
        }
        v453[25] = (__int64)&v367;
        v96 = *(_QWORD *)(a1 + 104);
        v367 = v96;
        if ( v96 )
        {
          v97 = (void (__fastcall ***)(_QWORD))(v96 + 8 + *(int *)(*(_QWORD *)(v96 + 8) + 4i64));
          (**v97)(v97);
        }
        v453[26] = (__int64)&v368;
        v98 = *(_QWORD *)(v15 + 24);
        v368 = v98;
        if ( v98 )
        {
          v99 = (void (__fastcall ***)(_QWORD))(v98 + 8 + *(int *)(*(_QWORD *)(v98 + 8) + 4i64));
          (**v99)(v99);
        }
        ((void (__fastcall *)(__int64 *, __int64 *, const char *, __int64 *))sub_1401DE240)(
          &v368,
          &v367,
          "_internal.AddWordToDictionary",
          &v333);
        v453[27] = (__int64)&v333;
        v100 = *(_QWORD *)(v15 + 16);
        v333 = v100;
        if ( v100 )
        {
          v101 = (void (__fastcall ***)(_QWORD))(v100 + 8 + *(int *)(*(_QWORD *)(v100 + 8) + 4i64));
          (**v101)(v101);
        }
        v453[28] = (__int64)&v369;
        v102 = *(_QWORD *)(a1 + 104);
        v369 = v102;
        if ( v102 )
        {
          v103 = (void (__fastcall ***)(_QWORD))(v102 + 8 + *(int *)(*(_QWORD *)(v102 + 8) + 4i64));
          (**v103)(v103);
        }
        v453[29] = (__int64)&v370;
        v104 = *(_QWORD *)(v15 + 24);
        v370 = v104;
        if ( v104 )
        {
          v105 = (void (__fastcall ***)(_QWORD))(v104 + 8 + *(int *)(*(_QWORD *)(v104 + 8) + 4i64));
          (**v105)(v105);
        }
        ((void (__fastcall *)(__int64 *, __int64 *, const char *, __int64 *))sub_1401DE240)(
          &v370,
          &v369,
          "Browser.NotifyUserActivation",
          &v333);
        v453[30] = (__int64)&v333;
        v106 = *(_QWORD *)(v15 + 16);
        v333 = v106;
        if ( v106 )
        {
          v107 = (void (__fastcall ***)(_QWORD))(v106 + 8 + *(int *)(*(_QWORD *)(v106 + 8) + 4i64));
          (**v107)(v107);
        }
        v453[31] = (__int64)&v371;
        v108 = *(_QWORD *)(a1 + 104);
        v371 = v108;
        if ( v108 )
        {
          v109 = (void (__fastcall ***)(_QWORD))(v108 + 8 + *(int *)(*(_QWORD *)(v108 + 8) + 4i64));
          (**v109)(v109);
        }
        v453[32] = (__int64)&v372;
        v110 = *(_QWORD *)(v15 + 24);
        v372 = v110;
        if ( v110 )
        {
          v111 = (void (__fastcall ***)(_QWORD))(v110 + 8 + *(int *)(*(_QWORD *)(v110 + 8) + 4i64));
          (**v111)(v111);
        }
        ((void (__fastcall *)(__int64 *, __int64 *, const char *, __int64 *))sub_1401DE240)(
          &v372,
          &v371,
          "Browser.GetBrowserID",
          &v333);
        v453[33] = (__int64)&v333;
        v112 = *(_QWORD *)(v15 + 16);
        v333 = v112;
        if ( v112 )
        {
          v113 = (void (__fastcall ***)(_QWORD))(v112 + 8 + *(int *)(*(_QWORD *)(v112 + 8) + 4i64));
          (**v113)(v113);
        }
        v453[34] = (__int64)&v373;
        v114 = *(_QWORD *)(a1 + 104);
        v373 = v114;
        if ( v114 )
        {
          v115 = (void (__fastcall ***)(_QWORD))(v114 + 8 + *(int *)(*(_QWORD *)(v114 + 8) + 4i64));
          (**v115)(v115);
        }
        v453[35] = (__int64)&v374;
        v116 = *(_QWORD *)(v15 + 24);
        v374 = v116;
        if ( v116 )
        {
          v117 = (void (__fastcall ***)(_QWORD))(v116 + 8 + *(int *)(*(_QWORD *)(v116 + 8) + 4i64));
          (**v117)(v117);
        }
        ((void (__fastcall *)(__int64 *, __int64 *, const char *, __int64 *))sub_1401DE240)(
          &v374,
          &v373,
          "OpenVR.ShowKeyboard",
          &v333);
        v453[36] = (__int64)&v333;
        v118 = *(_QWORD *)(v15 + 16);
        v333 = v118;
        if ( v118 )
        {
          v119 = (void (__fastcall ***)(_QWORD))(v118 + 8 + *(int *)(*(_QWORD *)(v118 + 8) + 4i64));
          (**v119)(v119);
        }
        v453[37] = (__int64)&v375;
        v120 = *(_QWORD *)(a1 + 104);
        v375 = v120;
        if ( v120 )
        {
          v121 = (void (__fastcall ***)(_QWORD))(v120 + 8 + *(int *)(*(_QWORD *)(v120 + 8) + 4i64));
          (**v121)(v121);
        }
        v453[38] = (__int64)&v376;
        v122 = *(_QWORD *)(v15 + 24);
        v376 = v122;
        if ( v122 )
        {
          v123 = (void (__fastcall ***)(_QWORD))(v122 + 8 + *(int *)(*(_QWORD *)(v122 + 8) + 4i64));
          (**v123)(v123);
        }
        ((void (__fastcall *)(__int64 *, __int64 *, const char *, __int64 *))sub_1401DE240)(
          &v376,
          &v375,
          "OpenVR.HideKeyboard",
          &v333);
        if ( (v5 & 0x10) != 0 )
        {
          v5 &= ~0x10u;
          v334 = v5;
          *(double *)&_XMM0 = sub_140089774(v457);
        }
        if ( (*(unsigned __int8 (__fastcall **)(_QWORD))(**(_QWORD **)(v15 + 8) + 120i64))(*(_QWORD *)(v15 + 8)) )
        {
          v453[39] = (__int64)&v333;
          v124 = *(_QWORD *)(v15 + 16);
          v333 = v124;
          if ( v124 )
          {
            v125 = (void (__fastcall ***)(_QWORD))(v124 + 8 + *(int *)(*(_QWORD *)(v124 + 8) + 4i64));
            (**v125)(v125);
          }
          v453[40] = (__int64)&v377;
          v126 = *(_QWORD *)(a1 + 104);
          v377 = v126;
          if ( v126 )
          {
            v127 = (void (__fastcall ***)(_QWORD))(v126 + 8 + *(int *)(*(_QWORD *)(v126 + 8) + 4i64));
            (**v127)(v127);
          }
          v453[41] = (__int64)&v378;
          v128 = *(_QWORD *)(v15 + 24);
          v378 = v128;
          if ( v128 )
          {
            v129 = (void (__fastcall ***)(_QWORD))(v128 + 8 + *(int *)(*(_QWORD *)(v128 + 8) + 4i64));
            (**v129)(v129);
          }
          ((void (__fastcall *)(__int64 *, __int64 *, const char *, __int64 *))sub_1401DE240)(
            &v378,
            &v377,
            "RegisterIFrameNavigatedCallback",
            &v333);
          v453[42] = (__int64)&v333;
          v130 = *(_QWORD *)(v15 + 16);
          v333 = v130;
          if ( v130 )
          {
            v131 = (void (__fastcall ***)(_QWORD))(v130 + 8 + *(int *)(*(_QWORD *)(v130 + 8) + 4i64));
            (**v131)(v131);
          }
          v453[43] = (__int64)&v379;
          v132 = *(_QWORD *)(a1 + 104);
          v379 = v132;
          if ( v132 )
          {
            v133 = (void (__fastcall ***)(_QWORD))(v132 + 8 + *(int *)(*(_QWORD *)(v132 + 8) + 4i64));
            (**v133)(v133);
          }
          v453[44] = (__int64)&v380;
          v134 = *(_QWORD *)(v15 + 24);
          v380 = v134;
          if ( v134 )
          {
            v135 = (void (__fastcall ***)(_QWORD))(v134 + 8 + *(int *)(*(_QWORD *)(v134 + 8) + 4i64));
            (**v135)(v135);
          }
          ((void (__fastcall *)(__int64 *, __int64 *, const char *, __int64 *))sub_1401DE240)(
            &v380,
            &v379,
            "Browser.HideCursorUntilMouseEvent",
            &v333);
          v453[45] = (__int64)&v333;
          v136 = *(_QWORD *)(v15 + 16);
          v333 = v136;
          if ( v136 )
          {
            v137 = (void (__fastcall ***)(_QWORD))(v136 + 8 + *(int *)(*(_QWORD *)(v136 + 8) + 4i64));
            (**v137)(v137);
          }
          v453[46] = (__int64)&v381;
          v138 = *(_QWORD *)(a1 + 104);
          v381 = v138;
          if ( v138 )
          {
            v139 = (void (__fastcall ***)(_QWORD))(v138 + 8 + *(int *)(*(_QWORD *)(v138 + 8) + 4i64));
            (**v139)(v139);
          }
          v453[47] = (__int64)&v382;
          v140 = *(_QWORD *)(v15 + 24);
          v382 = v140;
          if ( v140 )
          {
            v141 = (void (__fastcall ***)(_QWORD))(v140 + 8 + *(int *)(*(_QWORD *)(v140 + 8) + 4i64));
            (**v141)(v141);
          }
          ((void (__fastcall *)(__int64 *, __int64 *, const char *, __int64 *))sub_1401DE240)(
            &v382,
            &v381,
            "Browser.SetTouchGesturesToCancel",
            &v333);
          v453[48] = (__int64)&v333;
          v142 = *(_QWORD *)(v15 + 16);
          v333 = v142;
          if ( v142 )
          {
            v143 = (void (__fastcall ***)(_QWORD))(v142 + 8 + *(int *)(*(_QWORD *)(v142 + 8) + 4i64));
            (**v143)(v143);
          }
          v453[49] = (__int64)&v383;
          v144 = *(_QWORD *)(a1 + 104);
          v383 = v144;
          if ( v144 )
          {
            v145 = (void (__fastcall ***)(_QWORD))(v144 + 8 + *(int *)(*(_QWORD *)(v144 + 8) + 4i64));
            (**v145)(v145);
          }
          v453[50] = (__int64)&v384;
          v146 = *(_QWORD *)(v15 + 24);
          v384 = v146;
          if ( v146 )
          {
            v147 = (void (__fastcall ***)(_QWORD))(v146 + 8 + *(int *)(*(_QWORD *)(v146 + 8) + 4i64));
            (**v147)(v147);
          }
          ((void (__fastcall *)(__int64 *, __int64 *, const char *, __int64 *))sub_1401DE240)(
            &v384,
            &v383,
            "Window.Minimize",
            &v333);
          v453[51] = (__int64)&v333;
          v148 = *(_QWORD *)(v15 + 16);
          v333 = v148;
          if ( v148 )
          {
            v149 = (void (__fastcall ***)(_QWORD))(v148 + 8 + *(int *)(*(_QWORD *)(v148 + 8) + 4i64));
            (**v149)(v149);
          }
          v453[52] = (__int64)&v385;
          v150 = *(_QWORD *)(a1 + 104);
          v385 = v150;
          if ( v150 )
          {
            v151 = (void (__fastcall ***)(_QWORD))(v150 + 8 + *(int *)(*(_QWORD *)(v150 + 8) + 4i64));
            (**v151)(v151);
          }
          v453[53] = (__int64)&v386;
          v152 = *(_QWORD *)(v15 + 24);
          v386 = v152;
          if ( v152 )
          {
            v153 = (void (__fastcall ***)(_QWORD))(v152 + 8 + *(int *)(*(_QWORD *)(v152 + 8) + 4i64));
            (**v153)(v153);
          }
          ((void (__fastcall *)(__int64 *, __int64 *, const char *, __int64 *))sub_1401DE240)(
            &v386,
            &v385,
            "Window.ProcessShuttingDown",
            &v333);
          v453[54] = (__int64)&v333;
          v154 = *(_QWORD *)(v15 + 16);
          v333 = v154;
          if ( v154 )
          {
            v155 = (void (__fastcall ***)(_QWORD))(v154 + 8 + *(int *)(*(_QWORD *)(v154 + 8) + 4i64));
            (**v155)(v155);
          }
          v453[55] = (__int64)&v387;
          v156 = *(_QWORD *)(a1 + 104);
          v387 = v156;
          if ( v156 )
          {
            v157 = (void (__fastcall ***)(_QWORD))(v156 + 8 + *(int *)(*(_QWORD *)(v156 + 8) + 4i64));
            (**v157)(v157);
          }
          v453[56] = (__int64)&v388;
          v158 = *(_QWORD *)(v15 + 24);
          v388 = v158;
          if ( v158 )
          {
            v159 = (void (__fastcall ***)(_QWORD))(v158 + 8 + *(int *)(*(_QWORD *)(v158 + 8) + 4i64));
            (**v159)(v159);
          }
          ((void (__fastcall *)(__int64 *, __int64 *, const char *, __int64 *))sub_1401DE240)(
            &v388,
            &v387,
            "Window.ToggleMaximize",
            &v333);
          v453[57] = (__int64)&v333;
          v160 = *(_QWORD *)(v15 + 16);
          v333 = v160;
          if ( v160 )
          {
            v161 = (void (__fastcall ***)(_QWORD))(v160 + 8 + *(int *)(*(_QWORD *)(v160 + 8) + 4i64));
            (**v161)(v161);
          }
          v453[58] = (__int64)&v389;
          v162 = *(_QWORD *)(a1 + 104);
          v389 = v162;
          if ( v162 )
          {
            v163 = (void (__fastcall ***)(_QWORD))(v162 + 8 + *(int *)(*(_QWORD *)(v162 + 8) + 4i64));
            (**v163)(v163);
          }
          v453[59] = (__int64)&v390;
          v164 = *(_QWORD *)(v15 + 24);
          v390 = v164;
          if ( v164 )
          {
            v165 = (void (__fastcall ***)(_QWORD))(v164 + 8 + *(int *)(*(_QWORD *)(v164 + 8) + 4i64));
            (**v165)(v165);
          }
          ((void (__fastcall *)(__int64 *, __int64 *, const char *, __int64 *))sub_1401DE240)(
            &v390,
            &v389,
            "Window.MoveTo",
            &v333);
          v453[60] = (__int64)&v333;
          v166 = *(_QWORD *)(v15 + 16);
          v333 = v166;
          if ( v166 )
          {
            v167 = (void (__fastcall ***)(_QWORD))(v166 + 8 + *(int *)(*(_QWORD *)(v166 + 8) + 4i64));
            (**v167)(v167);
          }
          v453[61] = (__int64)&v391;
          v168 = *(_QWORD *)(a1 + 104);
          v391 = v168;
          if ( v168 )
          {
            v169 = (void (__fastcall ***)(_QWORD))(v168 + 8 + *(int *)(*(_QWORD *)(v168 + 8) + 4i64));
            (**v169)(v169);
          }
          v453[62] = (__int64)&v392;
          v170 = *(_QWORD *)(v15 + 24);
          v392 = v170;
          if ( v170 )
          {
            v171 = (void (__fastcall ***)(_QWORD))(v170 + 8 + *(int *)(*(_QWORD *)(v170 + 8) + 4i64));
            (**v171)(v171);
          }
          ((void (__fastcall *)(__int64 *, __int64 *, const char *, __int64 *))sub_1401DE240)(
            &v392,
            &v391,
            "Window.MoveToLocation",
            &v333);
          v453[63] = (__int64)&v333;
          v172 = *(_QWORD *)(v15 + 16);
          v333 = v172;
          if ( v172 )
          {
            v173 = (void (__fastcall ***)(_QWORD))(v172 + 8 + *(int *)(*(_QWORD *)(v172 + 8) + 4i64));
            (**v173)(v173);
          }
          v453[64] = (__int64)&v393;
          v174 = *(_QWORD *)(a1 + 104);
          v393 = v174;
          if ( v174 )
          {
            v175 = (void (__fastcall ***)(_QWORD))(v174 + 8 + *(int *)(*(_QWORD *)(v174 + 8) + 4i64));
            (**v175)(v175);
          }
          v453[65] = (__int64)&v394;
          v176 = *(_QWORD *)(v15 + 24);
          v394 = v176;
          if ( v176 )
          {
            v177 = (void (__fastcall ***)(_QWORD))(v176 + 8 + *(int *)(*(_QWORD *)(v176 + 8) + 4i64));
            (**v177)(v177);
          }
          ((void (__fastcall *)(__int64 *, __int64 *, const char *, __int64 *))sub_1401DE240)(
            &v394,
            &v393,
            "Window.ResizeTo",
            &v333);
          v453[66] = (__int64)&v333;
          v178 = *(_QWORD *)(v15 + 16);
          v333 = v178;
          if ( v178 )
          {
            v179 = (void (__fastcall ***)(_QWORD))(v178 + 8 + *(int *)(*(_QWORD *)(v178 + 8) + 4i64));
            (**v179)(v179);
          }
          v453[67] = (__int64)&v395;
          v180 = *(_QWORD *)(a1 + 104);
          v395 = v180;
          if ( v180 )
          {
            v181 = (void (__fastcall ***)(_QWORD))(v180 + 8 + *(int *)(*(_QWORD *)(v180 + 8) + 4i64));
            (**v181)(v181);
          }
          v453[68] = (__int64)&v396;
          v182 = *(_QWORD *)(v15 + 24);
          v396 = v182;
          if ( v182 )
          {
            v183 = (void (__fastcall ***)(_QWORD))(v182 + 8 + *(int *)(*(_QWORD *)(v182 + 8) + 4i64));
            (**v183)(v183);
          }
          ((void (__fastcall *)(__int64 *, __int64 *, const char *, __int64 *))sub_1401DE240)(
            &v396,
            &v395,
            "Window.SetMinSize",
            &v333);
          v453[69] = (__int64)&v333;
          v184 = *(_QWORD *)(v15 + 16);
          v333 = v184;
          if ( v184 )
          {
            v185 = (void (__fastcall ***)(_QWORD))(v184 + 8 + *(int *)(*(_QWORD *)(v184 + 8) + 4i64));
            (**v185)(v185);
          }
          v453[70] = (__int64)&v397;
          v186 = *(_QWORD *)(a1 + 104);
          v397 = v186;
          if ( v186 )
          {
            v187 = (void (__fastcall ***)(_QWORD))(v186 + 8 + *(int *)(*(_QWORD *)(v186 + 8) + 4i64));
            (**v187)(v187);
          }
          v453[71] = (__int64)&v398;
          v188 = *(_QWORD *)(v15 + 24);
          v398 = v188;
          if ( v188 )
          {
            v189 = (void (__fastcall ***)(_QWORD))(v188 + 8 + *(int *)(*(_QWORD *)(v188 + 8) + 4i64));
            (**v189)(v189);
          }
          ((void (__fastcall *)(__int64 *, __int64 *, const char *, __int64 *))sub_1401DE240)(
            &v398,
            &v397,
            "Window.SetResizeGrip",
            &v333);
          v453[72] = (__int64)&v333;
          v190 = *(_QWORD *)(v15 + 16);
          v333 = v190;
          if ( v190 )
          {
            v191 = (void (__fastcall ***)(_QWORD))(v190 + 8 + *(int *)(*(_QWORD *)(v190 + 8) + 4i64));
            (**v191)(v191);
          }
          v453[73] = (__int64)&v399;
          v192 = *(_QWORD *)(a1 + 104);
          v399 = v192;
          if ( v192 )
          {
            v193 = (void (__fastcall ***)(_QWORD))(v192 + 8 + *(int *)(*(_QWORD *)(v192 + 8) + 4i64));
            (**v193)(v193);
          }
          v453[74] = (__int64)&v400;
          v194 = *(_QWORD *)(v15 + 24);
          v400 = v194;
          if ( v194 )
          {
            v195 = (void (__fastcall ***)(_QWORD))(v194 + 8 + *(int *)(*(_QWORD *)(v194 + 8) + 4i64));
            (**v195)(v195);
          }
          ((void (__fastcall *)(__int64 *, __int64 *, const char *, __int64 *))sub_1401DE240)(
            &v400,
            &v399,
            "Window.SetComposition",
            &v333);
          v453[75] = (__int64)&v333;
          v196 = *(_QWORD *)(v15 + 16);
          v333 = v196;
          if ( v196 )
          {
            v197 = (void (__fastcall ***)(_QWORD))(v196 + 8 + *(int *)(*(_QWORD *)(v196 + 8) + 4i64));
            (**v197)(v197);
          }
          v453[76] = (__int64)&v401;
          v198 = *(_QWORD *)(a1 + 104);
          v401 = v198;
          if ( v198 )
          {
            v199 = (void (__fastcall ***)(_QWORD))(v198 + 8 + *(int *)(*(_QWORD *)(v198 + 8) + 4i64));
            (**v199)(v199);
          }
          v453[77] = (__int64)&v402;
          v200 = *(_QWORD *)(v15 + 24);
          v402 = v200;
          if ( v200 )
          {
            v201 = (void (__fastcall ***)(_QWORD))(v200 + 8 + *(int *)(*(_QWORD *)(v200 + 8) + 4i64));
            (**v201)(v201);
          }
          ((void (__fastcall *)(__int64 *, __int64 *, const char *, __int64 *))sub_1401DE240)(
            &v402,
            &v401,
            "Window.GamescopeBlur",
            &v333);
          v453[78] = (__int64)&v333;
          v202 = *(_QWORD *)(v15 + 16);
          v333 = v202;
          if ( v202 )
          {
            v203 = (void (__fastcall ***)(_QWORD))(v202 + 8 + *(int *)(*(_QWORD *)(v202 + 8) + 4i64));
            (**v203)(v203);
          }
          v453[79] = (__int64)&v403;
          v204 = *(_QWORD *)(a1 + 104);
          v403 = v204;
          if ( v204 )
          {
            v205 = (void (__fastcall ***)(_QWORD))(v204 + 8 + *(int *)(*(_QWORD *)(v204 + 8) + 4i64));
            (**v205)(v205);
          }
          v453[80] = (__int64)&v404;
          v206 = *(_QWORD *)(v15 + 24);
          v404 = v206;
          if ( v206 )
          {
            v207 = (void (__fastcall ***)(_QWORD))(v206 + 8 + *(int *)(*(_QWORD *)(v206 + 8) + 4i64));
            (**v207)(v207);
          }
          ((void (__fastcall *)(__int64 *, __int64 *, const char *, __int64 *))sub_1401DE240)(
            &v404,
            &v403,
            "Window.BringToFront",
            &v333);
          v453[81] = (__int64)&v333;
          v208 = *(_QWORD *)(v15 + 16);
          v333 = v208;
          if ( v208 )
          {
            v209 = (void (__fastcall ***)(_QWORD))(v208 + 8 + *(int *)(*(_QWORD *)(v208 + 8) + 4i64));
            (**v209)(v209);
          }
          v453[82] = (__int64)&v405;
          v210 = *(_QWORD *)(a1 + 104);
          v405 = v210;
          if ( v210 )
          {
            v211 = (void (__fastcall ***)(_QWORD))(v210 + 8 + *(int *)(*(_QWORD *)(v210 + 8) + 4i64));
            (**v211)(v211);
          }
          v453[83] = (__int64)&v406;
          v212 = *(_QWORD *)(v15 + 24);
          v406 = v212;
          if ( v212 )
          {
            v213 = (void (__fastcall ***)(_QWORD))(v212 + 8 + *(int *)(*(_QWORD *)(v212 + 8) + 4i64));
            (**v213)(v213);
          }
          ((void (__fastcall *)(__int64 *, __int64 *, const char *, __int64 *))sub_1401DE240)(
            &v406,
            &v405,
            "Window.SetForegroundWindow",
            &v333);
          v453[84] = (__int64)&v333;
          v214 = *(_QWORD *)(v15 + 16);
          v333 = v214;
          if ( v214 )
          {
            v215 = (void (__fastcall ***)(_QWORD))(v214 + 8 + *(int *)(*(_QWORD *)(v214 + 8) + 4i64));
            (**v215)(v215);
          }
          v453[85] = (__int64)&v407;
          v216 = *(_QWORD *)(a1 + 104);
          v407 = v216;
          if ( v216 )
          {
            v217 = (void (__fastcall ***)(_QWORD))(v216 + 8 + *(int *)(*(_QWORD *)(v216 + 8) + 4i64));
            (**v217)(v217);
          }
          v453[86] = (__int64)&v408;
          v218 = *(_QWORD *)(v15 + 24);
          v408 = v218;
          if ( v218 )
          {
            v219 = (void (__fastcall ***)(_QWORD))(v218 + 8 + *(int *)(*(_QWORD *)(v218 + 8) + 4i64));
            (**v219)(v219);
          }
          ((void (__fastcall *)(__int64 *, __int64 *, const char *, __int64 *))sub_1401DE240)(
            &v408,
            &v407,
            "Window.SetKeyFocus",
            &v333);
          v453[87] = (__int64)&v333;
          v220 = *(_QWORD *)(v15 + 16);
          v333 = v220;
          if ( v220 )
          {
            v221 = (void (__fastcall ***)(_QWORD))(v220 + 8 + *(int *)(*(_QWORD *)(v220 + 8) + 4i64));
            (**v221)(v221);
          }
          v453[88] = (__int64)&v409;
          v222 = *(_QWORD *)(a1 + 104);
          v409 = v222;
          if ( v222 )
          {
            v223 = (void (__fastcall ***)(_QWORD))(v222 + 8 + *(int *)(*(_QWORD *)(v222 + 8) + 4i64));
            (**v223)(v223);
          }
          v453[89] = (__int64)&v410;
          v224 = *(_QWORD *)(v15 + 24);
          v410 = v224;
          if ( v224 )
          {
            v225 = (void (__fastcall ***)(_QWORD))(v224 + 8 + *(int *)(*(_QWORD *)(v224 + 8) + 4i64));
            (**v225)(v225);
          }
          ((void (__fastcall *)(__int64 *, __int64 *, const char *, __int64 *))sub_1401DE240)(
            &v410,
            &v409,
            "Window.FlashWindow",
            &v333);
          v453[90] = (__int64)&v333;
          v226 = *(_QWORD *)(v15 + 16);
          v333 = v226;
          if ( v226 )
          {
            v227 = (void (__fastcall ***)(_QWORD))(v226 + 8 + *(int *)(*(_QWORD *)(v226 + 8) + 4i64));
            (**v227)(v227);
          }
          v453[91] = (__int64)&v411;
          v228 = *(_QWORD *)(a1 + 104);
          v411 = v228;
          if ( v228 )
          {
            v229 = (void (__fastcall ***)(_QWORD))(v228 + 8 + *(int *)(*(_QWORD *)(v228 + 8) + 4i64));
            (**v229)(v229);
          }
          v453[92] = (__int64)&v412;
          v230 = *(_QWORD *)(v15 + 24);
          v412 = v230;
          if ( v230 )
          {
            v231 = (void (__fastcall ***)(_QWORD))(v230 + 8 + *(int *)(*(_QWORD *)(v230 + 8) + 4i64));
            (**v231)(v231);
          }
          ((void (__fastcall *)(__int64 *, __int64 *, const char *, __int64 *))sub_1401DE240)(
            &v412,
            &v411,
            "Window.StopFlashWindow",
            &v333);
          v453[93] = (__int64)&v333;
          v232 = *(_QWORD *)(v15 + 16);
          v333 = v232;
          if ( v232 )
          {
            v233 = (void (__fastcall ***)(_QWORD))(v232 + 8 + *(int *)(*(_QWORD *)(v232 + 8) + 4i64));
            (**v233)(v233);
          }
          v453[94] = (__int64)&v413;
          v234 = *(_QWORD *)(a1 + 104);
          v413 = v234;
          if ( v234 )
          {
            v235 = (void (__fastcall ***)(_QWORD))(v234 + 8 + *(int *)(*(_QWORD *)(v234 + 8) + 4i64));
            (**v235)(v235);
          }
          v453[95] = (__int64)&v414;
          v236 = *(_QWORD *)(v15 + 24);
          v414 = v236;
          if ( v236 )
          {
            v237 = (void (__fastcall ***)(_QWORD))(v236 + 8 + *(int *)(*(_QWORD *)(v236 + 8) + 4i64));
            (**v237)(v237);
          }
          ((void (__fastcall *)(__int64 *, __int64 *, const char *, __int64 *))sub_1401DE240)(
            &v414,
            &v413,
            "Window.ShowWindow",
            &v333);
          v453[96] = (__int64)&v333;
          v238 = *(_QWORD *)(v15 + 16);
          v333 = v238;
          if ( v238 )
          {
            v239 = (void (__fastcall ***)(_QWORD))(v238 + 8 + *(int *)(*(_QWORD *)(v238 + 8) + 4i64));
            (**v239)(v239);
          }
          v453[97] = (__int64)&v415;
          v240 = *(_QWORD *)(a1 + 104);
          v415 = v240;
          if ( v240 )
          {
            v241 = (void (__fastcall ***)(_QWORD))(v240 + 8 + *(int *)(*(_QWORD *)(v240 + 8) + 4i64));
            (**v241)(v241);
          }
          v453[98] = (__int64)&v416;
          v242 = *(_QWORD *)(v15 + 24);
          v416 = v242;
          if ( v242 )
          {
            v243 = (void (__fastcall ***)(_QWORD))(v242 + 8 + *(int *)(*(_QWORD *)(v242 + 8) + 4i64));
            (**v243)(v243);
          }
          ((void (__fastcall *)(__int64 *, __int64 *, const char *, __int64 *))sub_1401DE240)(
            &v416,
            &v415,
            "Window.HideWindow",
            &v333);
          v453[99] = (__int64)&v333;
          v244 = *(_QWORD *)(v15 + 16);
          v333 = v244;
          if ( v244 )
          {
            v245 = (void (__fastcall ***)(_QWORD))(v244 + 8 + *(int *)(*(_QWORD *)(v244 + 8) + 4i64));
            (**v245)(v245);
          }
          v453[100] = (__int64)&v417;
          v246 = *(_QWORD *)(a1 + 104);
          v417 = v246;
          if ( v246 )
          {
            v247 = (void (__fastcall ***)(_QWORD))(v246 + 8 + *(int *)(*(_QWORD *)(v246 + 8) + 4i64));
            (**v247)(v247);
          }
          v453[101] = (__int64)&v418;
          v248 = *(_QWORD *)(v15 + 24);
          v418 = v248;
          if ( v248 )
          {
            v249 = (void (__fastcall ***)(_QWORD))(v248 + 8 + *(int *)(*(_QWORD *)(v248 + 8) + 4i64));
            (**v249)(v249);
          }
          ((void (__fastcall *)(__int64 *, __int64 *, const char *, __int64 *))sub_1401DE240)(
            &v418,
            &v417,
            "Window.SetWindowIcon",
            &v333);
          v453[102] = (__int64)&v333;
          v250 = *(_QWORD *)(v15 + 16);
          v333 = v250;
          if ( v250 )
          {
            v251 = (void (__fastcall ***)(_QWORD))(v250 + 8 + *(int *)(*(_QWORD *)(v250 + 8) + 4i64));
            (**v251)(v251);
          }
          v453[103] = (__int64)&v419;
          v252 = *(_QWORD *)(a1 + 104);
          v419 = v252;
          if ( v252 )
          {
            v253 = (void (__fastcall ***)(_QWORD))(v252 + 8 + *(int *)(*(_QWORD *)(v252 + 8) + 4i64));
            (**v253)(v253);
          }
          v453[104] = (__int64)&v420;
          v254 = *(_QWORD *)(v15 + 24);
          v420 = v254;
          if ( v254 )
          {
            v255 = (void (__fastcall ***)(_QWORD))(v254 + 8 + *(int *)(*(_QWORD *)(v254 + 8) + 4i64));
            (**v255)(v255);
          }
          ((void (__fastcall *)(__int64 *, __int64 *, const char *, __int64 *))sub_1401DE240)(
            &v420,
            &v419,
            "Window.GetWindowDimensions",
            &v333);
          v453[105] = (__int64)&v333;
          v256 = *(_QWORD *)(v15 + 16);
          v333 = v256;
          if ( v256 )
          {
            v257 = (void (__fastcall ***)(_QWORD))(v256 + 8 + *(int *)(*(_QWORD *)(v256 + 8) + 4i64));
            (**v257)(v257);
          }
          v453[106] = (__int64)&v421;
          v258 = *(_QWORD *)(a1 + 104);
          v421 = v258;
          if ( v258 )
          {
            v259 = (void (__fastcall ***)(_QWORD))(v258 + 8 + *(int *)(*(_QWORD *)(v258 + 8) + 4i64));
            (**v259)(v259);
          }
          v453[107] = (__int64)&v422;
          v260 = *(_QWORD *)(v15 + 24);
          v422 = v260;
          if ( v260 )
          {
            v261 = (void (__fastcall ***)(_QWORD))(v260 + 8 + *(int *)(*(_QWORD *)(v260 + 8) + 4i64));
            (**v261)(v261);
          }
          ((void (__fastcall *)(__int64 *, __int64 *, const char *, __int64 *))sub_1401DE240)(
            &v422,
            &v421,
            "Window.GetWindowRestoreDetails",
            &v333);
          v453[108] = (__int64)&v333;
          v262 = *(_QWORD *)(v15 + 16);
          v333 = v262;
          if ( v262 )
          {
            v263 = (void (__fastcall ***)(_QWORD))(v262 + 8 + *(int *)(*(_QWORD *)(v262 + 8) + 4i64));
            (**v263)(v263);
          }
          v453[109] = (__int64)&v423;
          v264 = *(_QWORD *)(a1 + 104);
          v423 = v264;
          if ( v264 )
          {
            v265 = (void (__fastcall ***)(_QWORD))(v264 + 8 + *(int *)(*(_QWORD *)(v264 + 8) + 4i64));
            (**v265)(v265);
          }
          v453[110] = (__int64)&v424;
          v266 = *(_QWORD *)(v15 + 24);
          v424 = v266;
          if ( v266 )
          {
            v267 = (void (__fastcall ***)(_QWORD))(v266 + 8 + *(int *)(*(_QWORD *)(v266 + 8) + 4i64));
            (**v267)(v267);
          }
          ((void (__fastcall *)(__int64 *, __int64 *, const char *, __int64 *))sub_1401DE240)(
            &v424,
            &v423,
            "Window.PositionWindowRelative",
            &v333);
          v453[111] = (__int64)&v333;
          v268 = *(_QWORD *)(v15 + 16);
          v333 = v268;
          if ( v268 )
          {
            v269 = (void (__fastcall ***)(_QWORD))(v268 + 8 + *(int *)(*(_QWORD *)(v268 + 8) + 4i64));
            (**v269)(v269);
          }
          v453[112] = (__int64)&v425;
          v270 = *(_QWORD *)(a1 + 104);
          v425 = v270;
          if ( v270 )
          {
            v271 = (void (__fastcall ***)(_QWORD))(v270 + 8 + *(int *)(*(_QWORD *)(v270 + 8) + 4i64));
            (**v271)(v271);
          }
          v453[113] = (__int64)&v426;
          v272 = *(_QWORD *)(v15 + 24);
          v426 = v272;
          if ( v272 )
          {
            v273 = (void (__fastcall ***)(_QWORD))(v272 + 8 + *(int *)(*(_QWORD *)(v272 + 8) + 4i64));
            (**v273)(v273);
          }
          ((void (__fastcall *)(__int64 *, __int64 *, const char *, __int64 *))sub_1401DE240)(
            &v426,
            &v425,
            "Window.GetMousePositionDetails",
            &v333);
          v453[114] = (__int64)&v333;
          v274 = *(_QWORD *)(v15 + 16);
          v333 = v274;
          if ( v274 )
          {
            v275 = (void (__fastcall ***)(_QWORD))(v274 + 8 + *(int *)(*(_QWORD *)(v274 + 8) + 4i64));
            (**v275)(v275);
          }
          v453[115] = (__int64)&v440;
          v276 = *(_QWORD *)(a1 + 104);
          v440 = v276;
          if ( v276 )
          {
            v277 = (void (__fastcall ***)(_QWORD))(v276 + 8 + *(int *)(*(_QWORD *)(v276 + 8) + 4i64));
            (**v277)(v277);
          }
          v453[116] = (__int64)&v428;
          v278 = *(_QWORD *)(v15 + 24);
          v428 = v278;
          if ( v278 )
          {
            v279 = (void (__fastcall ***)(_QWORD))(v278 + 8 + *(int *)(*(_QWORD *)(v278 + 8) + 4i64));
            (**v279)(v279);
          }
          ((void (__fastcall *)(__int64 *, __int64 *, const char *, __int64 *))sub_1401DE240)(
            &v428,
            &v440,
            "Window.IsWindowMinimized",
            &v333);
          v453[117] = (__int64)&v333;
          v280 = *(_QWORD *)(v15 + 16);
          v333 = v280;
          if ( v280 )
          {
            v281 = (void (__fastcall ***)(_QWORD))(v280 + 8 + *(int *)(*(_QWORD *)(v280 + 8) + 4i64));
            (**v281)(v281);
          }
          v453[118] = (__int64)&v429;
          v282 = *(_QWORD *)(a1 + 104);
          v429 = v282;
          if ( v282 )
          {
            v283 = (void (__fastcall ***)(_QWORD))(v282 + 8 + *(int *)(*(_QWORD *)(v282 + 8) + 4i64));
            (**v283)(v283);
          }
          v453[119] = (__int64)&v430;
          v284 = *(_QWORD *)(v15 + 24);
          v430 = v284;
          if ( v284 )
          {
            v285 = (void (__fastcall ***)(_QWORD))(v284 + 8 + *(int *)(*(_QWORD *)(v284 + 8) + 4i64));
            (**v285)(v285);
          }
          ((void (__fastcall *)(__int64 *, __int64 *, const char *, __int64 *))sub_1401DE240)(
            &v430,
            &v429,
            "Window.ToggleFullScreen",
            &v333);
          v453[120] = (__int64)&v333;
          v286 = *(_QWORD *)(v15 + 16);
          v333 = v286;
          if ( v286 )
          {
            v287 = (void (__fastcall ***)(_QWORD))(v286 + 8 + *(int *)(*(_QWORD *)(v286 + 8) + 4i64));
            (**v287)(v287);
          }
          v453[121] = (__int64)&v431;
          v288 = *(_QWORD *)(a1 + 104);
          v431 = v288;
          if ( v288 )
          {
            v289 = (void (__fastcall ***)(_QWORD))(v288 + 8 + *(int *)(*(_QWORD *)(v288 + 8) + 4i64));
            (**v289)(v289);
          }
          v453[122] = (__int64)&v432;
          v290 = *(_QWORD *)(v15 + 24);
          v432 = v290;
          if ( v290 )
          {
            v291 = (void (__fastcall ***)(_QWORD))(v290 + 8 + *(int *)(*(_QWORD *)(v290 + 8) + 4i64));
            (**v291)(v291);
          }
          ((void (__fastcall *)(__int64 *, __int64 *, const char *, __int64 *))sub_1401DE240)(
            &v432,
            &v431,
            "Window.SetHideOnClose",
            &v333);
          v453[123] = (__int64)&v333;
          v292 = *(_QWORD *)(v15 + 16);
          v333 = v292;
          if ( v292 )
          {
            v293 = (void (__fastcall ***)(_QWORD))(v292 + 8 + *(int *)(*(_QWORD *)(v292 + 8) + 4i64));
            (**v293)(v293);
          }
          v453[124] = (__int64)&v433;
          v294 = *(_QWORD *)(a1 + 104);
          v433 = v294;
          if ( v294 )
          {
            v295 = (void (__fastcall ***)(_QWORD))(v294 + 8 + *(int *)(*(_QWORD *)(v294 + 8) + 4i64));
            (**v295)(v295);
          }
          v453[125] = (__int64)&v434;
          v296 = *(_QWORD *)(v15 + 24);
          v434 = v296;
          if ( v296 )
          {
            v297 = (void (__fastcall ***)(_QWORD))(v296 + 8 + *(int *)(*(_QWORD *)(v296 + 8) + 4i64));
            (**v297)(v297);
          }
          ((void (__fastcall *)(__int64 *, __int64 *, const char *, __int64 *))sub_1401DE240)(
            &v434,
            &v433,
            "BrowserView.Create",
            &v333);
          v453[126] = (__int64)&v333;
          v298 = *(_QWORD *)(v15 + 16);
          v333 = v298;
          if ( v298 )
          {
            v299 = (void (__fastcall ***)(_QWORD))(v298 + 8 + *(int *)(*(_QWORD *)(v298 + 8) + 4i64));
            (**v299)(v299);
          }
          v453[127] = (__int64)&v435;
          v300 = *(_QWORD *)(a1 + 104);
          v435 = v300;
          if ( v300 )
          {
            v301 = (void (__fastcall ***)(_QWORD))(v300 + 8 + *(int *)(*(_QWORD *)(v300 + 8) + 4i64));
            (**v301)(v301);
          }
          v453[128] = (__int64)&v436;
          v302 = *(_QWORD *)(v15 + 24);
          v436 = v302;
          if ( v302 )
          {
            v303 = (void (__fastcall ***)(_QWORD))(v302 + 8 + *(int *)(*(_QWORD *)(v302 + 8) + 4i64));
            (**v303)(v303);
          }
          ((void (__fastcall *)(__int64 *, __int64 *, const char *, __int64 *))sub_1401DE240)(
            &v436,
            &v435,
            "BrowserView.CreatePopup",
            &v333);
          v453[129] = (__int64)&v333;
          v304 = *(_QWORD *)(v15 + 16);
          v333 = v304;
          if ( v304 )
          {
            v305 = (void (__fastcall ***)(_QWORD))(v304 + 8 + *(int *)(*(_QWORD *)(v304 + 8) + 4i64));
            (**v305)(v305);
          }
          v453[130] = (__int64)&v437;
          v306 = *(_QWORD *)(a1 + 104);
          v437 = v306;
          if ( v306 )
          {
            v307 = (void (__fastcall ***)(_QWORD))(v306 + 8 + *(int *)(*(_QWORD *)(v306 + 8) + 4i64));
            (**v307)(v307);
          }
          v453[131] = (__int64)&v438;
          v308 = *(_QWORD *)(v15 + 24);
          v438 = v308;
          if ( v308 )
          {
            v309 = (void (__fastcall ***)(_QWORD))(v308 + 8 + *(int *)(*(_QWORD *)(v308 + 8) + 4i64));
            (**v309)(v309);
          }
          ((void (__fastcall *)(__int64 *, __int64 *, const char *, __int64 *))sub_1401DE240)(
            &v438,
            &v437,
            "BrowserView.Destroy",
            &v333);
          v453[132] = (__int64)&v333;
          v310 = *(_QWORD *)(v15 + 16);
          v333 = v310;
          if ( v310 )
          {
            v311 = (void (__fastcall ***)(_QWORD))(v310 + 8 + *(int *)(*(_QWORD *)(v310 + 8) + 4i64));
            (**v311)(v311);
          }
          v453[133] = (__int64)&v439;
          v312 = *(_QWORD *)(a1 + 104);
          v439 = v312;
          if ( v312 )
          {
            v313 = (void (__fastcall ***)(_QWORD))(v312 + 8 + *(int *)(*(_QWORD *)(v312 + 8) + 4i64));
            (**v313)(v313);
          }
          v453[134] = (__int64)&v450;
          v314 = *(_QWORD *)(v15 + 24);
          v450 = v314;
          if ( v314 )
          {
            v315 = (void (__fastcall ***)(_QWORD))(v314 + 8 + *(int *)(*(_QWORD *)(v314 + 8) + 4i64));
            (**v315)(v315);
          }
          ((void (__fastcall *)(__int64 *, __int64 *, const char *, __int64 *))sub_1401DE240)(
            &v450,
            &v439,
            "BrowserView.PostMessageToParent",
            &v333);
          v453[135] = (__int64)&v333;
          v316 = *(_QWORD *)(v15 + 16);
          v333 = v316;
          if ( v316 )
          {
            v317 = (void (__fastcall ***)(_QWORD))(v316 + 8 + *(int *)(*(_QWORD *)(v316 + 8) + 4i64));
            (**v317)(v317);
          }
          v453[136] = (__int64)&v441;
          v318 = *(_QWORD *)(a1 + 104);
          v441 = v318;
          if ( v318 )
          {
            v319 = (void (__fastcall ***)(_QWORD))(v318 + 8 + *(int *)(*(_QWORD *)(v318 + 8) + 4i64));
            (**v319)(v319);
          }
          v453[137] = (__int64)&v442;
          v320 = *(_QWORD *)(v15 + 24);
          v442 = v320;
          if ( v320 )
          {
            v321 = (void (__fastcall ***)(_QWORD))(v320 + 8 + *(int *)(*(_QWORD *)(v320 + 8) + 4i64));
            (**v321)(v321);
          }
          ((void (__fastcall *)(__int64 *, __int64 *, const char *, __int64 *))sub_1401DE240)(
            &v442,
            &v441,
            "Window.PositionWindowRelativeEx",
            &v333);
        }
        if ( (v5 & 0x20) != 0 )
        {
          v5 &= ~0x20u;
          v334 = v5;
          *(double *)&_XMM0 = sub_140089774(v458);
        }
        v322 = *(_QWORD *)(*(__int64 (__fastcall **)(_QWORD, __int64 *))(**(_QWORD **)(v15 + 16) + 32i64))(
                            *(_QWORD *)(v15 + 16),
                            &v452);
        if ( v452 )
        {
          v323 = *(int *)(*(_QWORD *)(v452 + 8) + 4i64) + v452 + 8;
          (*(void (__fastcall **)(__int64))(*(_QWORD *)v323 + 8i64))(v323);
        }
        if ( v322 )
        {
          if ( (v5 & 0x40) != 0 )
          {
            v5 &= ~0x40u;
            v334 = v5;
            *(double *)&_XMM0 = sub_140089774(v459);
          }
          v324 = (__int64 *)(*(__int64 (__fastcall **)(_QWORD, __int64 *))(**(_QWORD **)(v15 + 16) + 32i64))(
                              *(_QWORD *)(v15 + 16),
                              v453);
          if ( (v5 & 0x80u) != 0 )
          {
            v5 &= ~0x80u;
            v334 = v5;
            *(double *)&_XMM0 = sub_140089774(v460);
          }
          v325 = *v324;
          v326 = *(void (__fastcall **)(__int64, const int **, __int64 *, _QWORD, __int64))(*(_QWORD *)v325 + 272i64);
          v453[138] = (__int64)&v443;
          v327 = *(_QWORD *)(v15 + 24);
          v443 = v327;
          if ( v327 )
          {
            v328 = (void (__fastcall ***)(_QWORD))(v327 + 8 + *(int *)(*(_QWORD *)(v327 + 8) + 4i64));
            (**v328)(v328);
          }
          v351 = &CefStringBase<CefStringTraitsUTF8>::`vftable';
          v352 = 0i64;
          v353 = 0;
          v347 = 0i64;
          v350 = 15i64;
          v349 = 11i64;
          __asm
          {
            movsd   xmm0, cs:qword_14047A990
            movsd   [rbp+0FC0h+var_1020], xmm0
          }
          strcpy(v348, "ent");
          sub_14012AF00(&v351, &v347);
          if ( v350 >= 0x10 )
          {
            v329 = v347;
            if ( v350 + 1 >= 0x1000 )
            {
              v329 = (_BYTE *)*((_QWORD *)v347 - 1);
              if ( (unsigned __int64)(v347 - v329 - 8) > 0x1F )
                invalid_parameter_noinfo_noreturn();
            }
            j_j_free(v329);
          }
          v349 = 0i64;
          v350 = 15i64;
          LOBYTE(v347) = 0;
          v326(v325, &v351, &v443, 0i64, v333);
          v351 = &CefStringBase<CefStringTraitsUTF8>::`vftable';
          if ( v352 )
          {
            if ( v353 )
            {
              cef_string_utf8_clear(v352);
              j_j_free(v352);
            }
            v352 = 0i64;
            v353 = 0;
          }
          if ( v453[0] )
          {
            v330 = *(int *)(*(_QWORD *)(v453[0] + 8) + 4i64) + v453[0] + 8;
            (*(void (__fastcall **)(__int64))(*(_QWORD *)v330 + 8i64))(v330);
          }
        }
        if ( (v5 & 0x100) != 0 )
        {
          v5 &= ~0x100u;
          v334 = v5;
          *(double *)&_XMM0 = sub_140089774(v461);
        }
        (*(void (__fastcall **)(_QWORD))(**(_QWORD **)(v15 + 16) + 48i64))(*(_QWORD *)(v15 + 16));
        v3 = a2;
      }
      ++v462;
      v8 = ++v444;
    }
    while ( v462 < *(_DWORD *)(a1 + 96) );
  }
  result = sub_1401F4320(&v464);
  if ( *v3 )
  {
    v332 = *v3 + 8 + *(int *)(*(_QWORD *)(*v3 + 8) + 4i64);
    return (*(__int64 (__fastcall **)(__int64))(*(_QWORD *)v332 + 8i64))(v332);
  }
  return result;
}