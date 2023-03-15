__int64 __fastcall sub_AD0C0(__int64 a1)
{
  float v2; // xmm1_4
  __int64 result; // rax
  DWORD TickCount; // edx
  int v5; // ecx
  int v6; // eax
  DWORD v7; // eax
  DWORD v8; // edi
  __int64 v9; // rax
  __int64 v10; // rax
  __int64 v11; // rdx
  int v12; // eax
  char v13; // al
  bool v14; // si
  __int64 v15; // rdx
  __int64 v16; // r8
  DWORD v17; // eax
  void *v18; // rsi
  void *v19; // rax
  __int64 v20; // rax
  __int64 v21; // rcx
  __int64 v22; // rdx
  __int64 v23; // r8
  __int64 v24; // rax
  __int64 v25; // rcx
  __int64 v26; // rcx
  DWORD v27; // ecx
  unsigned int v28; // ecx
  int v29; // edx
  __int64 v30; // r8
  __int64 v31; // rcx
  float v32; // xmm2_4
  float v33; // xmm2_4
  unsigned int v34; // esi
  DWORD v35; // eax
  unsigned int v36; // r15d
  int v37; // r13d
  int v38; // r12d
  int v39; // r14d
  HMONITOR v40; // rax
  float v41; // xmm6_4
  int v42; // ecx
  char v43; // al
  BOOL v44; // eax
  HWND v45; // r14
  __int64 v46; // rax
  __int64 v47; // rcx
  DWORD v49; // r14d
  __int64 v50; // rax
  __int64 v51; // rcx
  __int64 v52; // rdx
  bool v53; // al
  __int64 v54; // rax
  unsigned __int64 v55; // rsi
  unsigned __int64 v56; // r15
  unsigned __int64 v57; // rcx
  unsigned int v58; // edi
  __int64 v59; // rsi
  _QWORD *ThreadLocalStoragePointer; // r14
  unsigned __int64 v61; // rax
  unsigned __int64 v62; // rdx
  HMODULE ModuleHandleA; // rax
  int v64; // [rsp+30h] [rbp-D0h] BYREF
  char v65; // [rsp+34h] [rbp-CCh]
  char v66; // [rsp+35h] [rbp-CBh]
  unsigned int v67; // [rsp+38h] [rbp-C8h] BYREF
  int v68; // [rsp+3Ch] [rbp-C4h] BYREF
  unsigned int v69; // [rsp+40h] [rbp-C0h] BYREF
  unsigned int v70; // [rsp+44h] [rbp-BCh] BYREF
  int v71; // [rsp+48h] [rbp-B8h] BYREF
  int v72; // [rsp+4Ch] [rbp-B4h] BYREF
  int v73; // [rsp+50h] [rbp-B0h] BYREF
  struct tagRECT Rect; // [rsp+58h] [rbp-A8h] BYREF
  int v75[2]; // [rsp+68h] [rbp-98h] BYREF
  int v76[4]; // [rsp+70h] [rbp-90h] BYREF
  struct tagRECT v77; // [rsp+80h] [rbp-80h] BYREF
  void *v78; // [rsp+90h] [rbp-70h]
  DWORD CurrentProcessId; // [rsp+98h] [rbp-68h] BYREF
  __int64 v80; // [rsp+9Ch] [rbp-64h]
  __int64 v81; // [rsp+A4h] [rbp-5Ch]
  int v82; // [rsp+ACh] [rbp-54h]
  int v83; // [rsp+B0h] [rbp-50h]
  __int64 v84; // [rsp+B4h] [rbp-4Ch]
  char v85; // [rsp+BCh] [rbp-44h]
  char Buffer[256]; // [rsp+C0h] [rbp-40h] BYREF
  int v87; // [rsp+1C0h] [rbp+C0h] BYREF
  __int64 v88; // [rsp+1C4h] [rbp+C4h]
  int v89; // [rsp+1CCh] [rbp+CCh]
  char v90; // [rsp+1D0h] [rbp+D0h]
  bool v91; // [rsp+1D1h] [rbp+D1h]
  int v92; // [rsp+1D2h] [rbp+D2h]
  int v93; // [rsp+830h] [rbp+730h] BYREF
  int v94; // [rsp+834h] [rbp+734h]
  unsigned int v95; // [rsp+838h] [rbp+738h] BYREF
  int v96; // [rsp+840h] [rbp+740h] BYREF
  __int64 v97; // [rsp+848h] [rbp+748h] BYREF

  v2 = sub_A6C40();
  *(float *)(a1 + 156) = v2;
  result = qword_169D58;
  if ( qword_169D58
    && qword_169D58 != a1
    && (float)(v2 - *((float *)&qword_169D60 + 1)) < 2.0
    && *(float *)&qword_169D60 <= *(float *)(a1 + 152) )
  {
    return result;
  }
  qword_169D58 = a1;
  qword_169D60 = *(_QWORD *)(a1 + 152);
  TickCount = GetTickCount();
  v5 = *(_DWORD *)(a1 + 164) + 1;
  *(_DWORD *)(a1 + 164) = v5;
  v6 = *(_DWORD *)(a1 + 160);
  if ( v6 )
  {
    if ( v6 + 1000 < TickCount )
    {
      v93 = 17;
      v94 = v5;
      (*(void (__fastcall **)(__int64, int *, __int64))(*(_QWORD *)qword_151650 + 24i64))(qword_151650, &v93, 8i64);
      *(_DWORD *)(a1 + 160) += 1000;
      *(_DWORD *)(a1 + 164) = 0;
    }
  }
  else
  {
    *(_DWORD *)(a1 + 160) = TickCount;
    *(_DWORD *)(a1 + 164) = 1;
  }
  v7 = GetTickCount();
  v8 = v7;
  ++*(_QWORD *)(a1 + 8);
  if ( !*(_BYTE *)(a1 + 89) )
  {
    *(_DWORD *)(a1 + 48) = v7;
    if ( (unsigned __int8)sub_98790() )
    {
      CurrentProcessId = GetCurrentProcessId();
      v80 = qword_151AC8;
      v81 = qword_151AD0;
      v9 = common_getenv<char>("SteamTenfoot");
      if ( v9 )
        byte_169DA4 = unknown_libname_109(v9, 0i64, 10i64) != 0;
      v10 = common_getenv<char>("SteamGamepadUI");
      if ( v10 )
        byte_169DA5 = unknown_libname_109(v10, 0i64, 10i64) != 0;
      LOBYTE(v11) = byte_169DA4 == 0;
      sub_5F480(&unk_1410C8, v11);
      v12 = 1;
      if ( byte_169DA4 )
        v12 = 3;
      if ( byte_169DA5 )
        v12 = 4;
      v82 = v12;
      v83 = (*(__int64 (__fastcall **)(__int64))(*(_QWORD *)a1 + 144i64))(a1);
      if ( !byte_169DA4 && !byte_169DA5
        || (v13 = (*(__int64 (__fastcall **)(__int64))(*(_QWORD *)a1 + 56i64))(a1), v85 = 1, !v13) )
      {
        v85 = 0;
      }
      v84 = (*(__int64 (__fastcall **)(__int64))(*(_QWORD *)a1 + 168i64))(a1);
      sub_B0AD0(&v87, "GameOverlayRender_PIDStream", 1024i64, 100i64, 0, 0);
      sub_B16F0(&v87, &CurrentProcessId, 37i64);
      sub_B0DE0(&v87);
    }
    *(_BYTE *)(a1 + 89) = 1;
  }
  if ( byte_169D3E )
  {
    *(_BYTE *)(a1 + 92) = 1;
    byte_169D3E = 0;
  }
  v14 = byte_169D3F || byte_169D40;
  if ( v14 != (*(_QWORD *)(a1 + 72) != 0i64) )
  {
    LODWORD(v97) = 0;
    v67 = 0;
    (*(void (__fastcall **)(__int64, __int64 *, unsigned int *))(*(_QWORD *)a1 + 88i64))(a1, &v97, &v67);
    if ( *(_QWORD *)(a1 + 72) || (int)v97 > 0 && (int)v67 > 0 )
    {
      if ( v14 )
      {
        Steam::Log("Starting movie recording at %dx%d\n", (unsigned int)v97, v67);
        if ( qword_169D50 )
          sub_AB3C0(qword_169D50, v15, v16);
        qword_169D50 = a1;
        *(_QWORD *)(a1 + 96) = 0i64;
        *(_QWORD *)(a1 + 104) = 0i64;
        *(_QWORD *)(a1 + 112) = 0i64;
        v17 = GetCurrentProcessId();
        sprintf_s_1(Buffer, 0x100ui64, "GameOverlay_MovieStream_%u", v17);
        v18 = *(void **)(a1 + 72);
        if ( v18 && _InterlockedExchangeAdd((volatile signed __int32 *)v18, 0xFFFFFFFF) == 1 )
        {
          sub_B2580(v18);
          j_j_free(v18);
        }
        v19 = operator new(0x138ui64);
        v78 = v19;
        if ( v19 )
          v20 = sub_B2360(v19, Buffer, 16778896i64);
        else
          v20 = 0i64;
        *(_QWORD *)(a1 + 72) = v20;
        v21 = *(_QWORD *)(v20 + 280);
        if ( v21 && *(_DWORD *)(v21 + 16) )
        {
          Steam::Log("Created movie stream %s\n", Buffer);
        }
        else
        {
          Steam::Log("Couldn't create movie stream %s\n", Buffer);
          sub_AB3C0(a1, v22, v23);
        }
      }
      else
      {
        sub_AB3C0(a1, (unsigned int)v97, v67);
        Steam::Log("Stopped movie recording\n");
      }
    }
  }
  v24 = *(_QWORD *)(a1 + 72);
  if ( v24 )
  {
    v25 = *(_QWORD *)(v24 + 280);
    if ( v25 )
      v26 = *(unsigned int *)(v25 + 52);
    else
      v26 = 0i64;
    sub_8A500(v26);
  }
  if ( (!byte_14111C || byte_14111D) && *(_BYTE *)(a1 + 92) )
  {
    (*(void (__fastcall **)(__int64, _QWORD, _QWORD))(*(_QWORD *)a1 + 112i64))(a1, 0i64, 0i64);
    *(_BYTE *)(a1 + 92) = 0;
  }
  if ( !byte_169D3C )
  {
    sub_AB440();
    byte_169D3C = 1;
  }
  *(_BYTE *)(a1 + 90) = 0;
  if ( v8 >= *(_DWORD *)(a1 + 44) )
  {
    v27 = *(_DWORD *)(a1 + 60);
  }
  else
  {
    Steam::Log("Detected Plat_MSTime() wrapping\n");
    *(_DWORD *)(a1 + 52) = v8;
    *(_DWORD *)(a1 + 48) = v8;
    *(_DWORD *)(a1 + 56) = v8;
    *(_DWORD *)(a1 + 60) = v8;
    *(_DWORD *)(a1 + 40) = v8;
    *(_QWORD *)(a1 + 16) = *(_QWORD *)(a1 + 8);
    v27 = v8;
  }
  *(_DWORD *)(a1 + 44) = v8;
  if ( v8 - v27 >= 0x7D0 )
  {
    *(_DWORD *)(a1 + 60) = v8;
    sub_99A50();
  }
  v28 = *(_DWORD *)(a1 + 68);
  if ( v28 < 0x1E && v8 - *(_DWORD *)(a1 + 64) >= 0x2710 )
  {
    *(_DWORD *)(a1 + 68) = v28 + 1;
    *(_DWORD *)(a1 + 64) = v8;
    v64 = 20;
    if ( GetModuleHandleA("vrclient.dll") || (v65 = 0, GetModuleHandleA("vrclient_x64.dll")) )
      v65 = 1;
    if ( GetModuleHandleA("LibOVRRT32_1.dll") || GetModuleHandleA("LibOVRRT64_1.dll") )
    {
      v66 = 1;
    }
    else
    {
      v66 = 0;
      if ( !v65 )
        goto LABEL_76;
    }
    (*(void (__fastcall **)(__int64, int *, __int64))(*(_QWORD *)qword_151650 + 24i64))(qword_151650, &v64, 6i64);
    *(_DWORD *)(a1 + 68) = 30;
  }
LABEL_76:
  result = (*(__int64 (__fastcall **)(__int64))(*(_QWORD *)qword_151650 + 16i64))(qword_151650);
  if ( (unsigned int)result < 0x100 )
  {
    Steam::Log("Clearing input stream because it is about to overflow\n");
    result = (*(__int64 (__fastcall **)(__int64, _QWORD))(*(_QWORD *)qword_151650 + 40i64))(qword_151650, 0i64);
  }
  if ( v8 >= *(_DWORD *)(a1 + 52) || *(_QWORD *)(a1 + 72) )
  {
    v29 = v8 - *(_DWORD *)(a1 + 40);
    if ( (unsigned int)v29 < 0x2EE )
    {
      v33 = *(float *)(a1 + 24);
    }
    else
    {
      v30 = *(_QWORD *)(a1 + 8);
      v31 = v30 - *(_QWORD *)(a1 + 16);
      if ( v31 < 0 )
        v32 = (float)(v31 & 1 | (unsigned int)((unsigned __int64)v31 >> 1))
            + (float)(v31 & 1 | (unsigned int)((unsigned __int64)v31 >> 1));
      else
        v32 = (float)(int)v31;
      v33 = v32 * (float)(1000.0 / (float)v29);
      *(float *)(a1 + 24) = v33;
      *(_QWORD *)(a1 + 16) = v30;
      *(_DWORD *)(a1 + 40) = v8;
    }
    v34 = v8 - *(_DWORD *)(a1 + 48);
    if ( v33 >= 4.0 && !*(_QWORD *)(a1 + 72) )
    {
      if ( v34 <= 0x927C0 )
      {
        if ( v34 <= 0x493E0 )
        {
          if ( v34 <= 0x1D4C0 )
          {
            if ( v34 <= 0x2710 )
            {
              if ( v34 <= 0x1388 )
                goto LABEL_99;
              v35 = v8 + 500;
            }
            else
            {
              Steam::Log(
                "Disabling overlay for 2 seconds (%d seconds since last frame from ui process was seen)\n",
                v34 / 0x3E8);
              v35 = v8 + 2000;
            }
          }
          else
          {
            Steam::Log(
              "Disabling overlay for 10 seconds (%d seconds since last frame from ui process was seen)\n",
              v34 / 0x3E8);
            v35 = v8 + 15000;
          }
        }
        else
        {
          Steam::Log(
            "Disabling overlay for 30 seconds (%d seconds since last frame from ui process was seen)\n",
            v34 / 0x3E8);
          v35 = v8 + 30000;
        }
      }
      else
      {
        Steam::Log(
          "Disabling overlay for 20 minutes (%d seconds since last frame from ui process was seen)\n",
          v34 / 0x3E8);
        v35 = v8 + 1200000;
      }
      *(_DWORD *)(a1 + 52) = v35;
    }
LABEL_99:
    v36 = 0;
    if ( *(_QWORD *)(a1 + 32) <= 0x64ui64 )
      goto LABEL_115;
    if ( byte_14111C && !byte_14111D )
    {
      if ( v34 <= 0xC8 )
      {
        v36 = 0;
        if ( v34 <= 0x78 )
        {
          v36 = 0;
          if ( v34 <= 0x3C )
            goto LABEL_115;
          goto LABEL_109;
        }
      }
      else if ( *(float *)(a1 + 24) > 12.0 )
      {
        v36 = 16;
      }
      if ( *(float *)(a1 + 24) > 12.0 )
      {
        v36 = 8;
        goto LABEL_115;
      }
LABEL_109:
      if ( *(float *)(a1 + 24) > 18.0 )
        v36 = 4;
      goto LABEL_115;
    }
    if ( (*(unsigned int (__fastcall **)(_QWORD))(**(_QWORD **)(a1 + 80) + 8i64))(*(_QWORD *)(a1 + 80)) )
    {
      if ( v34 <= 0x320 )
      {
        if ( v34 <= 0x78 )
          goto LABEL_115;
      }
      else if ( *(float *)(a1 + 24) > 10.0 )
      {
        goto LABEL_114;
      }
      if ( *(float *)(a1 + 24) > 20.0 )
        v36 = 10;
LABEL_115:
      if ( v8 - *(_DWORD *)(a1 + 56) < 0x2EE )
      {
LABEL_145:
        v46 = *(_QWORD *)(a1 + 72);
        if ( v46 )
        {
          v47 = *(_QWORD *)(v46 + 280);
          if ( !v47 || *(_DWORD *)(v47 + 68) == 0 )
            sub_AE1C0(a1);
        }
        sub_84210();
        sub_87B10();
        sub_84C90();
        sub_884C0();
        v49 = GetTickCount();
        if ( dword_13A974 != -1 && (dword_13A974 != dword_13A98C || v49 < dword_169DBC || v49 - dword_169DBC > 0x1F4) )
        {
          v75[0] = 8;
          v75[1] = dword_13A974;
          (*(void (__fastcall **)(__int64, int *, __int64))(*(_QWORD *)qword_151650 + 24i64))(qword_151650, v75, 8i64);
          dword_13A98C = dword_13A974;
          dword_169DBC = v49;
        }
        if ( dword_15164C != dword_169DC4 || dword_151AA0 != dword_169DC8 || v49 - dword_169DC0 > 0x1F4 )
        {
          v76[0] = 18;
          v76[1] = dword_15164C;
          v76[2] = dword_151AA0;
          (*(void (__fastcall **)(__int64, int *, __int64))(*(_QWORD *)qword_151650 + 24i64))(qword_151650, v76, 12i64);
          dword_169DC4 = dword_15164C;
          dword_169DC8 = dword_151AA0;
          dword_169DC0 = v49;
        }
        sub_94800(&unk_1410C0);
        sub_948B0(&unk_1410C0);
        sub_5F250(&unk_1410C8);
        v50 = (*(__int64 (__fastcall **)(__int64))(*(_QWORD *)a1 + 160i64))(a1);
        if ( !(unsigned __int8)sub_739F0(&unk_1410C0, v50) )
        {
          if ( qword_151668 && (**(unsigned __int8 (__fastcall ***)(__int64, _QWORD))qword_151668)(qword_151668, v36) )
          {
            if ( qword_151658 && (unsigned __int8)sub_AB860(a1, qword_151658) )
            {
              *(_DWORD *)(a1 + 48) = v8;
              *(_DWORD *)(a1 + 52) = v8;
              ++*(_QWORD *)(a1 + 32);
              byte_151649 = 1;
            }
            else
            {
              Steam::Log("Failed reading frame completely\n");
            }
          }
          else if ( v34 < 0x1770
                 && (*(unsigned int (__fastcall **)(_QWORD))(**(_QWORD **)(a1 + 80) + 8i64))(*(_QWORD *)(a1 + 80)) )
          {
            sub_AB860(a1, *(_QWORD *)(a1 + 80));
          }
          else
          {
            if ( !byte_14111C )
            {
LABEL_177:
              v51 = *(_QWORD *)(a1 + 72);
              if ( v51 )
              {
                v52 = *(_QWORD *)(v51 + 280);
                v53 = v52 && *(_DWORD *)(v52 + 68) != 0;
                if ( !v53 || (sub_AE1C0(a1), (v51 = *(_QWORD *)(a1 + 72)) != 0) )
                {
                  v54 = *(_QWORD *)(v51 + 280);
                  if ( !v54 || *(_DWORD *)(v54 + 52) != 1 )
                    goto LABEL_207;
                }
              }
              if ( !*(_BYTE *)(a1 + 93) )
                goto LABEL_207;
              if ( !v51 || !(unsigned __int8)sub_B2630(v51, &v70, &v69) )
              {
                v70 = 60000;
                v69 = 1001;
              }
              v55 = sub_A6D20();
              v56 = (unsigned __int64)v69 * sub_A6D00() / v70;
              v57 = *(_QWORD *)(a1 + 104);
              if ( !v57 )
                goto LABEL_205;
              if ( v55 < v57 )
              {
                v58 = sub_A6D70(v55, *(_QWORD *)(a1 + 104));
                if ( v58 )
                {
                  if ( !*(_QWORD *)(a1 + 72) )
                    goto LABEL_201;
                  v59 = (unsigned int)TlsIndex;
                  ThreadLocalStoragePointer = NtCurrentTeb()->ThreadLocalStoragePointer;
                  do
                  {
                    if ( v58 <= 2 )
                      break;
                    if ( dword_169DA0 > *(_DWORD *)(ThreadLocalStoragePointer[v59] + 1040i64) )
                    {
                      Init_thread_header(&dword_169DA0);
                      if ( dword_169DA0 == -1 )
                      {
                        dword_169D9C = timeBeginPeriod(1u);
                        Init_thread_footer(&dword_169DA0);
                      }
                    }
                    Sleep(2u);
                    v61 = sub_A6D20();
                    v62 = *(_QWORD *)(a1 + 104);
                    v58 = v61 >= v62 ? 0 : sub_A6D70(v61, v62);
                  }
                  while ( *(_QWORD *)(a1 + 72) );
                  if ( v58 )
LABEL_201:
                    sub_AE120(a1, v58);
                  goto LABEL_206;
                }
                v57 = *(_QWORD *)(a1 + 104);
              }
              v55 -= 3 * v56;
              if ( v57 < v55 )
LABEL_205:
                *(_QWORD *)(a1 + 104) = v55;
LABEL_206:
              *(_QWORD *)(a1 + 104) += v56;
LABEL_207:
              result = sub_A6D20();
              *(_QWORD *)(a1 + 112) = result;
              return result;
            }
            if ( !byte_14111D )
            {
              Steam::Log("Forcing internal overlay disable and requesting ui disable\n");
              sub_949B0(&unk_1410C0);
              v73 = 1;
              (*(void (__fastcall **)(__int64, int *, __int64))(*(_QWORD *)qword_151650 + 24i64))(
                qword_151650,
                &v73,
                4i64);
            }
          }
        }
        if ( byte_14111C && !byte_14111D && *(_BYTE *)(a1 + 92) )
        {
          (*(void (__fastcall **)(__int64, _QWORD, _QWORD))(*(_QWORD *)a1 + 112i64))(a1, 0i64, 0i64);
          *(_BYTE *)(a1 + 92) = 0;
        }
        goto LABEL_177;
      }
      sub_95260(&unk_1410C0);
      *(_DWORD *)(a1 + 56) = v8;
      (*(void (__fastcall **)(__int64, unsigned int *, int *))(*(_QWORD *)a1 + 88i64))(a1, &v95, &v93);
      (*(void (__fastcall **)(__int64, int *, int *, int *, int *))(*(_QWORD *)a1 + 192i64))(a1, &v72, &v71, &v96, &v68);
      v37 = v95;
      if ( (int)v95 <= 100 || (v38 = v93, v93 <= 100) || v96 <= 1 || v68 <= 1 )
      {
LABEL_144:
        sub_5EF00(&unk_1410C8);
        goto LABEL_145;
      }
      v39 = 96;
      if ( (*(unsigned __int8 (__fastcall **)(__int64))(*(_QWORD *)a1 + 176i64))(a1) )
      {
        v40 = (HMONITOR)(*(__int64 (__fastcall **)(__int64))(*(_QWORD *)a1 + 184i64))(a1);
      }
      else
      {
        if ( !hwnd )
          goto LABEL_128;
        v40 = MonitorFromWindow(hwnd, 0);
      }
      v39 = sub_AB120(v40);
LABEL_128:
      v41 = (float)((float)v39 * (float)(int)v95) / (float)v96;
      v97 = *((_QWORD *)NtCurrentTeb()->ThreadLocalStoragePointer + (unsigned int)TlsIndex);
      if ( dword_169DA8 > *(_DWORD *)(v97 + 1040) )
      {
        Init_thread_header(&dword_169DA8);
        if ( dword_169DA8 == -1 )
        {
          html5app_steam = GetModuleHandleA("html5app_steam.exe") != 0i64;
          Init_thread_footer(&dword_169DA8);
        }
      }
      v42 = v93;
      if ( v93 > 1200
        || html5app_steam && (v43 = (*(__int64 (__fastcall **)(__int64))(*(_QWORD *)a1 + 176i64))(a1), v42 = v93, !v43) )
      {
        if ( v41 > 143.89999 )
        {
          v37 = (int)(float)((float)((float)((float)(int)v95 * 96.0) / v41) + 0.5);
          v38 = (int)(float)((float)((float)((float)v42 * 96.0) / v41) + 0.5);
        }
      }
      *(float *)&dword_141178 = (float)v37 / (float)v96;
      *(float *)&dword_14117C = (float)v38 / (float)v68;
      *(float *)&dword_141170 = (float)v96 / (float)(int)v95;
      *(float *)&dword_141174 = (float)v68 / (float)v42;
      sub_5F2A0((unsigned int)&unk_1410C8, v72, v71, v96, v68, v39);
      sub_5F3D0(&unk_1410C8, v95, (unsigned int)v93);
      v87 = 0;
      v88 = (*(__int64 (__fastcall **)(__int64))(*(_QWORD *)a1 + 160i64))(a1);
      v89 = (*(__int64 (__fastcall **)(__int64))(*(_QWORD *)a1 + 152i64))(a1);
      v90 = (*(__int64 (__fastcall **)(__int64))(*(_QWORD *)a1 + 176i64))(a1);
      v91 = 0;
      v92 = -1;
      if ( dword_169DB8 > *(_DWORD *)(v97 + 1040) )
      {
        Init_thread_header(&dword_169DB8);
        if ( dword_169DB8 == -1 )
        {
          ModuleHandleA = GetModuleHandleA("user32.dll");
          IsProcessDPIAware = (BOOL (__stdcall *)())GetProcAddress(ModuleHandleA, "IsProcessDPIAware");
          Init_thread_footer(&dword_169DB8);
        }
      }
      if ( IsProcessDPIAware )
      {
        v44 = IsProcessDPIAware();
        v91 = v44;
        if ( v44 )
        {
          v45 = hwnd;
          if ( hwnd )
          {
            if ( GetClientRect(hwnd, &Rect)
              && GetWindowRect(v45, &v77)
              && ClientToScreen(v45, (LPPOINT)&Rect)
              && ClientToScreen(v45, (LPPOINT)&Rect.right) )
            {
              LOBYTE(v92) = LOBYTE(Rect.left) - LOBYTE(v77.left);
              BYTE1(v92) = LOBYTE(Rect.top) - LOBYTE(v77.top);
              BYTE2(v92) = LOBYTE(v77.right) - LOBYTE(Rect.right);
              HIBYTE(v92) = LOBYTE(v77.bottom) - LOBYTE(Rect.bottom);
            }
          }
        }
      }
      sub_8A4E0(&v87);
      goto LABEL_144;
    }
LABEL_114:
    v36 = 15;
    goto LABEL_115;
  }
  return result;
}