 export const values=[
    {
      Deviation:"No flow",
      Causes:"Amine buffer tank empty",
      Consequences:"Damage to pump",
      Safeguards:"Level indication",
      Recommendations:"Consider a low level alarm"
    },
    {
      Consequences:"Loss of fresh amine to absorber lower giving H2S in the sweet gas line",
      Safeguards:"Level indication",
      Recommendations:"Consider a low level alarm"
    },
    {
      Causes:"Line frozen",
      Consequences:"Loss of fresh amine to absorber lower giving H2S in the sweet gas line",
      Safeguards:"Level indication",
      Recommendations:"Check freezing point of water / amine mixture"
    },
    {
      Causes:"Valve in line shut",
      Consequences:"Possible damage to line as pump dead heads i.e runs against closed discharge line",
      Safeguards:"Operator training",
      Recommendations:"Check line for max. pump pressure"
    },
    {
      Deviation:"More flow",
      Causes:"None (Fixed by max. pump discharge)"
    },
    {
      Deviation:"Less flow",
      Causes:"Line partially plugged or valve partially closed",
      Consequences:"Possible damage to line as pump dead heads grind against closed discharge line",
      Safeguards:"None",
      Recommendations:"Check freezing point of water / amine mixture and check pipe spec against pump dead head pressure"
    },
    {
      Deviation:"Reverse flow",
      Causes:"Pump trips",
      Consequences:"Back flow of 20 bar gas to amine tank ",
      Safeguards:"Non-return valve (which may not be reliable in amine service)",
      Recommendations:"In view of the potential consequence of the release and its likelihood undertake a full study of hazards involved, and safeguards appropriate to these hazards proposed (posssibly installing a chopper valve to cut in and prevent back flow)"
    },
    {
      Consequences:"Possible rupture of tank",
      Safeguards:"Tank weak seam",
      Recommendations:"In view of the potential consequence of the release and its likelihood undertake a full study of hazards involved, and safeguards appropriate to these hazards proposed (posssibly installing a chopper valve to cut in and prevent back flow)"
    },
    {
      Consequences:"Major H2S release to plant causing potential toxic cloud and possible vapour cloud explosion if cloud reaches congested part of the plant",
      Safeguards:"None",
      Recommendations:"In view of the potential consequence of the release and its likelihood undertake a full study of hazards involved, and safeguards appropriate to these hazards proposed (posssibly installing a chopper valve to cut in and prevent back flow)"
    },
    {
      Deviation:"High Temperature",
      Causes:"Failure of cooling on the amine regeneration unit resulting in hot amine in amine tank",
      Consequences:"Possibility of poor absorber lover efficiency",
      Safeguards:"Temperature alarm on amine regeneration unit"
    },
    {
      Deviation:"Low Temperature",
      Causes:"Cold conditions",
      Consequences:"Possible freeezing of line",
      Safeguards:"None at present - but see action under 'No Flow' to investigate freezing point"
    },
    {
      Deviation:"High Pressure",
      Causes:"Pump dead head",
      Consequences:"Possibility of overpressure of pipe",
      Safeguards:"None - but see action under no flow to check pipe spec"
    },
    {
      Causes:"Reverse flow from absorber lower",
      Consequences:"Possibility of overpressure of pipe",
      Safeguards:"None",
      Recommendations:"In previous action to check pipe spec against pump dead head pressure also include checking spec against operating pressure in absorber tower"
    },
    {
      Deviation:"Low Pressure",
      Causes:"None identified",
      Consequences:"Not seen as a problem",
      Safeguards:"Line good for vacuum conditions",
      Recommendations:"None"
    }
  ]
