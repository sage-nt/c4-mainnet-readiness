window.C4_CHECKLIST = {
  "generatedAt": "2026-07-28T22:15:50.893Z",
  "source": "C4 mainnet readiness checklist reconciled 2026-07-28",
  "sheet": {
    "id": "1vfdI69YwDDSyJ9AdFl6ULKc0C6qpoh8JzItaQvCNIt4",
    "checklistGid": "2005833910",
    "dashboardGid": "718941904",
    "guideGid": "890645384"
  },
  "items": [
    {
      "id": "C4-001-923CE8BC",
      "ordinal": 1,
      "section": "Release definition",
      "priority": "P0",
      "title": "Name the launch candidate precisely",
      "detail": "pin commits for programs, star-atlas-tech, sage-editor, nemesis-engine, zink-web, Galaxy/support services, generated SDKs, and deployment/IaC.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 2
    },
    {
      "id": "C4-002-068F4366",
      "ordinal": 2,
      "section": "Release definition",
      "priority": "P0",
      "title": "Pin the mainnet addresses",
      "detail": "SAGE Game, SAGE program, Player Profile, Profile Faction, cargo, ATLAS mint, reward PDAs, admin profiles, faction treasuries, and service endpoints.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 3
    },
    {
      "id": "C4-003-8D8B1BE2",
      "ordinal": 3,
      "section": "Release definition",
      "priority": "P0",
      "title": "Pin the game-data artifact",
      "detail": "record the generated config SHA-256, its source export SHA-256s, converter commit, schema version, and validator output.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 4
    },
    {
      "id": "C4-004-D4B7061F",
      "ordinal": 4,
      "section": "Release definition",
      "priority": "P0",
      "title": "Define “launched”",
      "detail": "specify whether launch means contracts deployed, invited canary players enabled, public UI enabled, rewards enabled, or all of those.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 5
    },
    {
      "id": "C4-005-CC2BDAE6",
      "ordinal": 5,
      "section": "Release definition",
      "priority": "P0",
      "title": "Define the rollback boundary",
      "detail": "list what can be rolled back by client deploy, program upgrade, config change, feature flag, operator pause, or not at all.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 6
    },
    {
      "id": "C4-006-8177BD2B",
      "ordinal": 6,
      "section": "Release definition",
      "priority": "P0",
      "title": "Form a release group",
      "detail": "one named signer each for chain/programs, client, game data, economy, infrastructure, security, QA, support, and final go/no-go.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 7
    },
    {
      "id": "C4-007-301E82D0",
      "ordinal": 7,
      "section": "Release definition",
      "priority": "P0",
      "title": "Freeze the candidate",
      "detail": "no program, config, SDK, or feature-flag changes after the final rehearsal except through an explicit release exception.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 8
    },
    {
      "id": "C4-008-61D9C959",
      "ordinal": 8,
      "section": "Known launch blockers and high-risk gaps",
      "priority": "P0",
      "title": "Decide the program lineage.",
      "detail": "The deployed Phase 3 branch contains crew, encounters, missions, faction warfare, SDU intel, and crew trading, while programs#794 is still open and conflicting with main. Choose one exact source tree for mainnet and prove deployed bytecode is built from it.",
      "links": [
        {
          "label": "`programs#794`",
          "url": "https://github.com/staratlasmeta/programs/pull/794"
        }
      ],
      "baselineChecked": false,
      "sheetRow": 9
    },
    {
      "id": "C4-009-87605F43",
      "ordinal": 9,
      "section": "Known launch blockers and high-risk gaps",
      "priority": "P0",
      "title": "Regenerate and publish matching IDL/clients.",
      "detail": "The Phase 3 deployment has instructions absent from committed IDL/SDK artifacts; track nemesis-engine#3. No mainnet deployment may rely on hand-rolled discriminators as its canonical client.",
      "links": [
        {
          "label": "`nemesis-engine#3`",
          "url": "https://github.com/staratlasmeta/nemesis-engine/issues/3"
        }
      ],
      "baselineChecked": false,
      "sheetRow": 10
    },
    {
      "id": "C4-010-77564502",
      "ordinal": 10,
      "section": "Known launch blockers and high-risk gaps",
      "priority": "P0",
      "title": "Replace the destructive deployment path.",
      "detail": "programs/scripts/universe-update.sh deploys a wiper, runs it, redeploys programs, and calls init-game. It must not be used unchanged for mainnet. Produce an audited mainnet bootstrap/migration script with destructive operations absent.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 11
    },
    {
      "id": "C4-011-3888777A",
      "ordinal": 11,
      "section": "Known launch blockers and high-risk gaps",
      "priority": "P0",
      "title": "Certify production-ID builds.",
      "detail": "Mainnet/stage SBF artifacts must embed production cross-program IDs via the intended production feature. Zink artifacts must not be reused. Verify embedded IDs from the binaries, not only build flags.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 12
    },
    {
      "id": "C4-012-579D3CC1",
      "ordinal": 12,
      "section": "Known launch blockers and high-risk gaps",
      "priority": "P0",
      "title": "Fix permissionless rent-refund capture.",
      "detail": "Land and deploy the reviewed form of programs#848, or an equivalent independently verified fix.",
      "links": [
        {
          "label": "`programs#848`",
          "url": "https://github.com/staratlasmeta/programs/pull/848"
        }
      ],
      "baselineChecked": false,
      "sheetRow": 13
    },
    {
      "id": "C4-013-723F7844",
      "ordinal": 13,
      "section": "Known launch blockers and high-risk gaps",
      "priority": "P0",
      "title": "Complete delegated rent-funding migration.",
      "detail": "Resolve programs#852 and execute its ordered Player Profile → client/permissions → SAGE transition without exposing unrestricted vault-drain authority.",
      "links": [
        {
          "label": "`programs#852`",
          "url": "https://github.com/staratlasmeta/programs/pull/852"
        }
      ],
      "baselineChecked": false,
      "sheetRow": 14
    },
    {
      "id": "C4-014-2D7B53AC",
      "ordinal": 14,
      "section": "Known launch blockers and high-risk gaps",
      "priority": "P0",
      "title": "Recover missed RPC updates.",
      "detail": "Resolve star-atlas-tech#4855: reconnect must refetch authoritative state, and transaction flows need a real recovery refresh. Test by dropping WSS during claim edits, fleet transfers, crafting, and inventory updates.",
      "links": [
        {
          "label": "`star-atlas-tech#4855`",
          "url": "https://github.com/staratlasmeta/star-atlas-tech/issues/4855"
        }
      ],
      "baselineChecked": false,
      "sheetRow": 15
    },
    {
      "id": "C4-015-326D35ED",
      "ordinal": 15,
      "section": "Known launch blockers and high-risk gaps",
      "priority": "P0",
      "title": "Make fleet-vs-fleet combat independent of invalid reward state.",
      "detail": "Current C4 evidence in nemesis-engine#34 says the reward registry/config is incomplete or invalid enough to reject AttackFleet. Initialize valid reward accounts or safely disable the dependency, then prove live fleet combat.",
      "links": [
        {
          "label": "`nemesis-engine#34`",
          "url": "https://github.com/staratlasmeta/nemesis-engine/pull/34"
        }
      ],
      "baselineChecked": false,
      "sheetRow": 16
    },
    {
      "id": "C4-016-8E8E10FC",
      "ordinal": 16,
      "section": "Known launch blockers and high-risk gaps",
      "priority": "P0",
      "title": "Restore combat XP end to end.",
      "detail": "Land the correct aggregation fix (programs#858, not the stale/conflicting alternative), make XP-only ship changes detectable by upload tooling, author nonzero XP values, bump ship definitions, resync fleets, and prove a kill changes the correct Character XP.",
      "links": [
        {
          "label": "`programs#858`",
          "url": "https://github.com/staratlasmeta/programs/pull/858"
        }
      ],
      "baselineChecked": false,
      "sheetRow": 17
    },
    {
      "id": "C4-017-05587BAC",
      "ordinal": 17,
      "section": "Known launch blockers and high-risk gaps",
      "priority": "P0",
      "title": "Finalize crafting rent settlement.",
      "detail": "Resolve complete-output collection after aged jobs (programs#860) and building-finalize refund settlement (programs#824); prove success after accounts have sat long enough to expose rent drift.",
      "links": [
        {
          "label": "`programs#860`",
          "url": "https://github.com/staratlasmeta/programs/pull/860"
        },
        {
          "label": "`programs#824`",
          "url": "https://github.com/staratlasmeta/programs/pull/824"
        }
      ],
      "baselineChecked": false,
      "sheetRow": 18
    },
    {
      "id": "C4-018-ECCE0037",
      "ordinal": 18,
      "section": "Known launch blockers and high-risk gaps",
      "priority": "P0",
      "title": "Close or disable active PTR bug fixes still in draft/open state",
      "detail": "Stop Subwarp (star-atlas-tech#5103), stale starbase-upgrade contribution rows (#5102), and bundled cultivation-hub hydration (#5106).",
      "links": [
        {
          "label": "`star-atlas-tech#5103`",
          "url": "https://github.com/staratlasmeta/star-atlas-tech/pull/5103"
        },
        {
          "label": "`#5102`",
          "url": "https://github.com/staratlasmeta/star-atlas-tech/pull/5102"
        },
        {
          "label": "`#5106`",
          "url": "https://github.com/staratlasmeta/star-atlas-tech/pull/5106"
        }
      ],
      "baselineChecked": false,
      "sheetRow": 19
    },
    {
      "id": "C4-019-2DFC843D",
      "ordinal": 19,
      "section": "Known launch blockers and high-risk gaps",
      "priority": "P0",
      "title": "Reconcile ownership sidecars.",
      "detail": "The Level-0 fallback fix is merged (programs#857), but stale faction-ownership sidecars still block building placement until re-witnessed. Audit and re-stamp every mainnet starbase/claim owner before enabling placement.",
      "links": [
        {
          "label": "`programs#857`",
          "url": "https://github.com/staratlasmeta/programs/pull/857"
        }
      ],
      "baselineChecked": false,
      "sheetRow": 20
    },
    {
      "id": "C4-020-5A2C1FC4",
      "ordinal": 20,
      "section": "Known launch blockers and high-risk gaps",
      "priority": "P0",
      "title": "Resolve the LP data/program mismatch.",
      "detail": "The approved editor direction retains u32 and clamps/normalizes authored values (sage-editor#203); current programs#847 widens serialized state to u64 and is a fresh-genesis-only layout change. Produce one coherent, reviewed artifact set.",
      "links": [
        {
          "label": "`sage-editor#203`",
          "url": "https://github.com/staratlasmeta/sage-editor/pull/203"
        },
        {
          "label": "`programs#847`",
          "url": "https://github.com/staratlasmeta/programs/pull/847"
        }
      ],
      "baselineChecked": false,
      "sheetRow": 21
    },
    {
      "id": "C4-021-BADA120B",
      "ordinal": 21,
      "section": "Known launch blockers and high-risk gaps",
      "priority": "P0",
      "title": "Run a fresh balance certification.",
      "detail": "The available combat report is stale and shows extreme outliers; it cannot be used as launch approval. Re-simulate the exact candidate data and obtain explicit design/economy signoff.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 22
    },
    {
      "id": "C4-022-AC36361A",
      "ordinal": 22,
      "section": "Known launch blockers and high-risk gaps",
      "priority": "P0",
      "title": "Complete a mainnet-shaped rehearsal.",
      "detail": "Same build mode, addresses, authorities, migrations, config generator, RPC topology, and operator commands as launch; no substitutions except the cluster itself.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 23
    },
    {
      "id": "C4-023-635B0836",
      "ordinal": 23,
      "section": "Scope and feature-flag lock",
      "priority": "DECISION",
      "title": "Device-keypair onboarding",
      "detail": "mainnet custody model, recovery model, browser storage behavior, warnings, and supported browsers.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 24
    },
    {
      "id": "C4-024-7F93946B",
      "ordinal": 24,
      "section": "Scope and feature-flag lock",
      "priority": "DECISION",
      "title": "PTR faucet/starter bundle",
      "detail": "production must not expose PTR faucet routes or test distribution types. Define the real first-player asset path.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 25
    },
    {
      "id": "C4-025-D7AF302F",
      "ordinal": 25,
      "section": "Scope and feature-flag lock",
      "priority": "DECISION",
      "title": "First Flight tutorial / Goal Tracker",
      "detail": "complete and enable, or keep both production flags off.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 26
    },
    {
      "id": "C4-026-8023A770",
      "ordinal": 26,
      "section": "Scope and feature-flag lock",
      "priority": "DECISION",
      "title": "Missions UI",
      "detail": "currently opt-in/WIP; align the client flag with the selected Phase 3 program scope.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 27
    },
    {
      "id": "C4-027-40BFE857",
      "ordinal": 27,
      "section": "Scope and feature-flag lock",
      "priority": "DECISION",
      "title": "Temporary research-XP grants",
      "detail": "force off in production and prove the grant instruction/control cannot be reached.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 28
    },
    {
      "id": "C4-028-27C96F07",
      "ordinal": 28,
      "section": "Scope and feature-flag lock",
      "priority": "DECISION",
      "title": "Combat stimulants",
      "detail": "finish data, program, and UI validation or force off.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 29
    },
    {
      "id": "C4-029-7CDE4FFE",
      "ordinal": 29,
      "section": "Scope and feature-flag lock",
      "priority": "DECISION",
      "title": "Individuated crew and crew trading",
      "detail": "real on-chain data/indexing only; mock crew must never be used for mainnet state.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 30
    },
    {
      "id": "C4-030-C15CA8A3",
      "ordinal": 30,
      "section": "Scope and feature-flag lock",
      "priority": "DECISION",
      "title": "Encounters and SDU intel lottery",
      "detail": "enable only with finalized tables, treasuries, odds, expiry/reap operations, and support tooling.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 31
    },
    {
      "id": "C4-031-83E841CF",
      "ordinal": 31,
      "section": "Scope and feature-flag lock",
      "priority": "DECISION",
      "title": "Faction warfare and territory yield",
      "detail": "define whether the Phase 3 system is a launch feature, canary, or dark deployment.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 32
    },
    {
      "id": "C4-032-02366998",
      "ordinal": 32,
      "section": "Scope and feature-flag lock",
      "priority": "DECISION",
      "title": "NPC organic siege",
      "detail": "define approved regions, fleet cohort, targets, schedule, rewards, pause authority, and incident owner.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 33
    },
    {
      "id": "C4-033-BCC257F7",
      "ordinal": 33,
      "section": "Scope and feature-flag lock",
      "priority": "DECISION",
      "title": "PvP",
      "detail": "define exact safe/medium/high-risk rules, opt-in expectations, losses, loot, and reward sources.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 34
    },
    {
      "id": "C4-034-6A6D99CB",
      "ordinal": 34,
      "section": "Scope and feature-flag lock",
      "priority": "DECISION",
      "title": "ATLAS rewards",
      "detail": "current launch direction is LP-only; confirm all other sources remain disabled on chain, not just hidden in UI.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 35
    },
    {
      "id": "C4-035-B11EA6BD",
      "ordinal": 35,
      "section": "Scope and feature-flag lock",
      "priority": "DECISION",
      "title": "Medallions",
      "detail": "confirm PvP Medallions, salvage Medallions, and starbase-destruction Medallions remain disabled unless fully funded and tested.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 36
    },
    {
      "id": "C4-036-ECE758A0",
      "ordinal": 36,
      "section": "Scope and feature-flag lock",
      "priority": "DECISION",
      "title": "Marketplace/local markets and fleet rentals",
      "detail": "define which surfaces are C4 launch scope and how fees, custody, cancellation, expiry, and attribution work.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 37
    },
    {
      "id": "C4-037-BCF4C088",
      "ordinal": 37,
      "section": "Scope and feature-flag lock",
      "priority": "P0",
      "title": "Generate a production flag manifest",
      "detail": "build-time values, runtime values, defaults, secret-store source, and evidence from the deployed container.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 38
    },
    {
      "id": "C4-038-7BB331CD",
      "ordinal": 38,
      "section": "Scope and feature-flag lock",
      "priority": "P0",
      "title": "Add a flag invariant test",
      "detail": "unsafe combinations such as faucet-on + mainnet, XP-grant-on + mainnet, or client feature-on + missing program accounts must fail deployment.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 39
    },
    {
      "id": "C4-039-50CC8A14",
      "ordinal": 39,
      "section": "Program, SDK, and deployment certification",
      "priority": "P0",
      "title": "Reproducible builds",
      "detail": "build every program twice in clean environments and compare hashes.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 40
    },
    {
      "id": "C4-040-2D606EDB",
      "ordinal": 40,
      "section": "Program, SDK, and deployment certification",
      "priority": "P0",
      "title": "Source-to-binary proof",
      "detail": "archive compiler/toolchain versions, Cargo lockfile, features, build logs, .so hashes, and program-data hashes.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 41
    },
    {
      "id": "C4-041-BFDCAF88",
      "ordinal": 41,
      "section": "Program, SDK, and deployment certification",
      "priority": "P0",
      "title": "IDL parity",
      "detail": "generated IDL instruction/account/error sets exactly match the deployed source.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 42
    },
    {
      "id": "C4-042-E02E7F23",
      "ordinal": 42,
      "section": "Program, SDK, and deployment certification",
      "priority": "P0",
      "title": "SDK parity",
      "detail": "TypeScript and Rust clients are regenerated from the pinned IDL, published immutably, and consumed by the pinned client/operator tools.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 43
    },
    {
      "id": "C4-043-129A6E22",
      "ordinal": 43,
      "section": "Program, SDK, and deployment certification",
      "priority": "P0",
      "title": "Cross-program IDs",
      "detail": "test every CPI path against the intended production Player Profile, Profile Faction, SAGE, cargo, and token programs.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 44
    },
    {
      "id": "C4-044-E3278146",
      "ordinal": 44,
      "section": "Program, SDK, and deployment certification",
      "priority": "P0",
      "title": "Account-layout migration audit",
      "detail": "enumerate every state-layout change since the intended mainnet baseline and provide migration or fresh-genesis proof.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 45
    },
    {
      "id": "C4-045-943A8067",
      "ordinal": 45,
      "section": "Program, SDK, and deployment certification",
      "priority": "P0",
      "title": "Phase 3 migrations, if in scope",
      "detail": "migrate SDU tables, initialize crew rosters, seed factions/relations/economics, and validate every new PDA family.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 46
    },
    {
      "id": "C4-046-DD255800",
      "ordinal": 46,
      "section": "Program, SDK, and deployment certification",
      "priority": "P0",
      "title": "Reward initialization",
      "detail": "create a sane registry, active config, epoch, ledgers, banks/reserves, and source configuration; reject garbage or missing versions.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 47
    },
    {
      "id": "C4-047-EFD6CA2D",
      "ordinal": 47,
      "section": "Program, SDK, and deployment certification",
      "priority": "P0",
      "title": "Mainnet bootstrap is idempotent",
      "detail": "a second dry run performs no unintended writes and reports exact already-satisfied state.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 48
    },
    {
      "id": "C4-048-C720A52A",
      "ordinal": 48,
      "section": "Program, SDK, and deployment certification",
      "priority": "P0",
      "title": "No wiper path",
      "detail": "mainnet deployment credentials cannot deploy or invoke the wiper as part of the normal runbook.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 49
    },
    {
      "id": "C4-049-8B628596",
      "ordinal": 49,
      "section": "Program, SDK, and deployment certification",
      "priority": "P0",
      "title": "Upgrade authorities",
      "detail": "move program and critical config authorities to approved multisig/governance, verify signer quorum, and test an emergency upgrade in rehearsal.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 50
    },
    {
      "id": "C4-050-5BB63E97",
      "ordinal": 50,
      "section": "Program, SDK, and deployment certification",
      "priority": "P0",
      "title": "Admin profile permissions",
      "detail": "least privilege for game config, fleets, markets, rewards, faction state, and rent funding.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 51
    },
    {
      "id": "C4-051-699DB12A",
      "ordinal": 51,
      "section": "Program, SDK, and deployment certification",
      "priority": "P0",
      "title": "Key custody",
      "detail": "inventory all deploy/admin/mint/faucet/NPC keys, backup and rotation process, hardware/multisig custody, and break-glass access.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 52
    },
    {
      "id": "C4-052-0CDCC943",
      "ordinal": 52,
      "section": "Program, SDK, and deployment certification",
      "priority": "P0",
      "title": "Rent/SOL funding",
      "detail": "calculate program buffer, profile vault, service, NPC, treasury, and operator SOL needs under peak load.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 53
    },
    {
      "id": "C4-053-A50072EF",
      "ordinal": 53,
      "section": "Program, SDK, and deployment certification",
      "priority": "P0",
      "title": "Compute/account limits",
      "detail": "test worst-case fleet, crafting, claim-stake, market, combat, and migration transactions on the target runtime.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 54
    },
    {
      "id": "C4-054-A38F3484",
      "ordinal": 54,
      "section": "Program, SDK, and deployment certification",
      "priority": "P0",
      "title": "Full program validation",
      "detail": "format, clippy, native tests, black-box SBF tests, IDL/client regeneration checks, Miri where applicable, and fixture fingerprint checks.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 55
    },
    {
      "id": "C4-055-5A5A0CA5",
      "ordinal": 55,
      "section": "Program, SDK, and deployment certification",
      "priority": "P0",
      "title": "Independent security review",
      "detail": "account ownership, signer/auth certificate paths, PDA seeds, optional-account sentinels, arithmetic saturation, rent routing, permissionless cranks, and replay/idempotency.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 56
    },
    {
      "id": "C4-056-D362F54B",
      "ordinal": 56,
      "section": "Program, SDK, and deployment certification",
      "priority": "P0",
      "title": "Pre/post deployment oracle",
      "detail": "exact expected accounts and fields before each transaction, simulation result, signature, finalized readback, and digest comparison.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 57
    },
    {
      "id": "C4-057-D942149B",
      "ordinal": 57,
      "section": "Game-data source of truth",
      "priority": "P0",
      "title": "Require generated config",
      "detail": "run deployment with generated SAGE Editor output and C4_CONFIG_REQUIRE_GENERATED=1; the legacy programs/cli/c4-cli/conf/*.json fallback must not silently become launch data.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 58
    },
    {
      "id": "C4-058-68212C69",
      "ordinal": 58,
      "section": "Game-data source of truth",
      "priority": "P0",
      "title": "Revalidate the 14 top-level sections",
      "detail": "building tags, cargo categories, cargo types, claim-stake values, crafting-hab values, daily check-in, game ID, global configs, level thresholds, map, recipes, research nodes, scanning patterns, and ships.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 59
    },
    {
      "id": "C4-059-78307DD7",
      "ordinal": 59,
      "section": "Game-data source of truth",
      "priority": "P0",
      "title": "Publish a section digest",
      "detail": "count, canonical hash, source file, editor owner, and chain readback hash for every section.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 60
    },
    {
      "id": "C4-060-7FA0A760",
      "ordinal": 60,
      "section": "Game-data source of truth",
      "priority": "P0",
      "title": "Prohibit side-channel edits",
      "detail": "all post-freeze changes must start in the chosen source of truth and regenerate the full artifact.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 61
    },
    {
      "id": "C4-061-846C3AF2",
      "ordinal": 61,
      "section": "Game-data source of truth",
      "priority": "P0",
      "title": "Reconcile converter status",
      "detail": "re-audit the dated SA_UNIVERSE decommission criteria; prove all formerly pass-through sections are truly authored and round-trip safe.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 62
    },
    {
      "id": "C4-062-50D063DC",
      "ordinal": 62,
      "section": "Game-data source of truth",
      "priority": "P0",
      "title": "Validate referential integrity",
      "detail": "every cargo, recipe input/output, building tag, ship component, research requirement, system link, reward item, and market asset resolves.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 63
    },
    {
      "id": "C4-063-CEE1A638",
      "ordinal": 63,
      "section": "Game-data source of truth",
      "priority": "P0",
      "title": "Validate uniqueness",
      "detail": "numerical IDs, names/slugs where required, PDA seeds, ship/config IDs, recipe IDs, building IDs, and cargo IDs.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 64
    },
    {
      "id": "C4-064-4C6981D7",
      "ordinal": 64,
      "section": "Game-data source of truth",
      "priority": "P0",
      "title": "Validate numeric bounds",
      "detail": "every value fits the actual serialized program type and every aggregate worst case fits without panic or truncation.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 65
    },
    {
      "id": "C4-065-41BF3EF9",
      "ordinal": 65,
      "section": "Game-data source of truth",
      "priority": "P0",
      "title": "Validate no placeholder/test values",
      "detail": "zero XP, placeholder Titan values, mock crew, test mints, dev URLs, synthetic profiles, debug grants, and temporary admin overrides are either intentionally documented or absent.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 66
    },
    {
      "id": "C4-066-EEC2E7B3",
      "ordinal": 66,
      "section": "Game-data source of truth",
      "priority": "P0",
      "title": "Validate update semantics",
      "detail": "prove the uploader notices every launch-relevant field, including xp_value and movement XP rates; no meaningful edit may yield an empty diff.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 67
    },
    {
      "id": "C4-067-A9A91FCC",
      "ordinal": 67,
      "section": "Game-data source of truth",
      "priority": "P0",
      "title": "Snapshot target state",
      "detail": "archive finalized account data before and after bootstrap so drift and rollback decisions are evidence-based.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 68
    },
    {
      "id": "C4-068-29DC135D",
      "ordinal": 68,
      "section": "Economy and balance certification",
      "priority": "P0",
      "title": "Economy signoff pack",
      "detail": "one versioned document containing all sources, sinks, rates, caps, reserves, formulas, assumptions, and expected weekly ranges.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 69
    },
    {
      "id": "C4-069-9B1A741F",
      "ordinal": 69,
      "section": "Economy and balance certification",
      "priority": "P0",
      "title": "Ship balance",
      "detail": "rerun all ship/config matchups on the exact 2,928-row candidate and review win rate, battle duration, size dominance, tier scaling, repair economics, and ammo/AP exhaustion.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 70
    },
    {
      "id": "C4-070-AF02890D",
      "ordinal": 70,
      "section": "Economy and balance certification",
      "priority": "P0",
      "title": "Resolve known outlier families",
      "detail": "any ship/config with zero or near-zero viability, dominant >design-threshold performance, or inverted tier scaling needs a fix or signed exception.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 71
    },
    {
      "id": "C4-071-65648883",
      "ordinal": 71,
      "section": "Economy and balance certification",
      "priority": "P0",
      "title": "Combat XP",
      "detail": "author per-ship XP, movement XP, starbase XP policy, fleet aggregation, saturation behavior, progression pacing, and anti-farm constraints.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 72
    },
    {
      "id": "C4-072-CA70A7BC",
      "ordinal": 72,
      "section": "Economy and balance certification",
      "priority": "P0",
      "title": "LP values",
      "detail": "certify all ship LP values, fleet aggregate bound, PVE LP rate, starbase-upgrade material LP rates, Repair Kit rate, and faction-pool lever.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 73
    },
    {
      "id": "C4-073-EA8EF85C",
      "ordinal": 73,
      "section": "Economy and balance certification",
      "priority": "P0",
      "title": "LP pool solvency",
      "detail": "fund reserves, simulate high/expected/low participation, define replenishment policy, and alert before depletion.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 74
    },
    {
      "id": "C4-074-B937A2E5",
      "ordinal": 74,
      "section": "Economy and balance certification",
      "priority": "P0",
      "title": "Medallion policy",
      "detail": "if disabled, prove every generation source is zero/off. If enabled, certify cargo, price, per-faction cap, buyer orders, rollover, reserve, and anomaly response.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 75
    },
    {
      "id": "C4-075-B31EF7FB",
      "ordinal": 75,
      "section": "Economy and balance certification",
      "priority": "P0",
      "title": "Reward reserve units",
      "detail": "separate ATLAS Floyd thresholds from cargo-unit thresholds; do not reuse one low-balance number across unlike assets.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 76
    },
    {
      "id": "C4-076-EE5F411F",
      "ordinal": 76,
      "section": "Economy and balance certification",
      "priority": "P0",
      "title": "Crafting balance",
      "detail": "inputs, outputs, duration, crew, fees, usage limits, research gates, Hab modifiers, and all zero-input or positive-arbitrage loops.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 77
    },
    {
      "id": "C4-077-1E2959BF",
      "ordinal": 77,
      "section": "Economy and balance certification",
      "priority": "P0",
      "title": "Claim-stake balance",
      "detail": "construction/refund values, production/storage, rent, crew/power, tags, planet restrictions, deconstruction, and time-to-payback.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 78
    },
    {
      "id": "C4-078-80ECA275",
      "ordinal": 78,
      "section": "Economy and balance certification",
      "priority": "P0",
      "title": "Crafting-Hab balance",
      "detail": "placement, buildings, recipe access, modifiers, resource consumption/swap, rent, eviction, respawn, and deconstruction.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 79
    },
    {
      "id": "C4-079-7CD66EF9",
      "ordinal": 79,
      "section": "Economy and balance certification",
      "priority": "P0",
      "title": "Starbase-upgrade balance",
      "detail": "per-level resources, LP rates, deposit caps, completion triggers, rewards, and faction race pacing.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 80
    },
    {
      "id": "C4-080-65023245",
      "ordinal": 80,
      "section": "Economy and balance certification",
      "priority": "P0",
      "title": "Starbase recipe mutability policy",
      "detail": "do not edit active requirement maps without defined omission, tombstone, refund, duration, and completion semantics. Prefer immutable revisions/presets.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 81
    },
    {
      "id": "C4-081-F57DC4DD",
      "ordinal": 81,
      "section": "Economy and balance certification",
      "priority": "P0",
      "title": "Mining balance",
      "detail": "resource distribution, extraction speed, cargo limits, fuel, crew, risk, and inflation under bot-scale throughput.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 82
    },
    {
      "id": "C4-082-E2881F51",
      "ordinal": 82,
      "section": "Economy and balance certification",
      "priority": "P0",
      "title": "Scanning balance",
      "detail": "pattern odds, costs, cooldowns, SDU/encounter outputs, location/risk modifiers, and duplicate/replay handling.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 83
    },
    {
      "id": "C4-083-CF4D64FB",
      "ordinal": 83,
      "section": "Economy and balance certification",
      "priority": "P0",
      "title": "Combat rewards vs losses",
      "detail": "compare expected loot/LP/XP to ammo, repair, ship risk, travel time, and NPC availability.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 84
    },
    {
      "id": "C4-084-585D06F0",
      "ordinal": 84,
      "section": "Economy and balance certification",
      "priority": "P0",
      "title": "Marketplace economics",
      "detail": "fees, price precision, min/max orders, escrow funding, cancellation, partial fills, and manipulation controls.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 85
    },
    {
      "id": "C4-085-1F7AD9E6",
      "ordinal": 85,
      "section": "Economy and balance certification",
      "priority": "P0",
      "title": "Daily check-in and research pacing",
      "detail": "XP types, costs, unlock graph, fleet capacity, catch-up, and expected time to each core capability.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 86
    },
    {
      "id": "C4-086-B7A39029",
      "ordinal": 86,
      "section": "Economy and balance certification",
      "priority": "P0",
      "title": "Faucet/initial conditions",
      "detail": "define what a new mainnet player owns, can afford, and can do without admin intervention.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 87
    },
    {
      "id": "C4-087-DE2D89CE",
      "ordinal": 87,
      "section": "Economy and balance certification",
      "priority": "P1",
      "title": "Publish balance telemetry thresholds",
      "detail": "inflation, reward issuance, reserve runway, ship win rates, resource prices, progression speed, and concentration alerts.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 88
    },
    {
      "id": "C4-088-D8AC671E",
      "ordinal": 88,
      "section": "Feature readiness — account, onboarding, and progression",
      "priority": "VERIFY",
      "title": "Welcome/legal flow",
      "detail": "correct mainnet copy, current terms/privacy links, explicit real-value warning, acceptance persistence, and accessibility.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 89
    },
    {
      "id": "C4-089-772F5F12",
      "ordinal": 89,
      "section": "Feature readiness — account, onboarding, and progression",
      "priority": "P0",
      "title": "Wallet/device key lifecycle",
      "detail": "create, reconnect, switch, revoke, recover, clear storage, unsupported browser, and lost-device behavior.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 90
    },
    {
      "id": "C4-090-A7952C2E",
      "ordinal": 90,
      "section": "Feature readiness — account, onboarding, and progression",
      "priority": "P0",
      "title": "Profile/Character creation",
      "detail": "valid-name rules, faction choice, duplicate/retry behavior, correct production program IDs, and finalized readback.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 91
    },
    {
      "id": "C4-091-34F55988",
      "ordinal": 91,
      "section": "Feature readiness — account, onboarding, and progression",
      "priority": "P0",
      "title": "Profile SOL/ATLAS vault",
      "detail": "deposit, withdraw, limits, rent reserve, insufficient funds, cancellation, and stale balance refresh.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 92
    },
    {
      "id": "C4-092-4D478EAE",
      "ordinal": 92,
      "section": "Feature readiness — account, onboarding, and progression",
      "priority": "P0",
      "title": "Hot-wallet permissions",
      "detail": "least privilege, expiry, revoke, visible scope, transaction attribution, and no mainnet debug shortcuts.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 93
    },
    {
      "id": "C4-093-1391005D",
      "ordinal": 93,
      "section": "Feature readiness — account, onboarding, and progression",
      "priority": "P0",
      "title": "Mainnet starter path",
      "detail": "a fresh player can reach one useful gameplay loop without PTR faucet assumptions.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 94
    },
    {
      "id": "C4-094-B4777D2F",
      "ordinal": 94,
      "section": "Feature readiness — account, onboarding, and progression",
      "priority": "P0",
      "title": "Returning/migrated players",
      "detail": "reconnect, existing profile discovery, old account layouts, stale authorities, and multiple Characters.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 95
    },
    {
      "id": "C4-095-19B2C3F9",
      "ordinal": 95,
      "section": "Feature readiness — account, onboarding, and progression",
      "priority": "P0",
      "title": "Daily check-in",
      "detail": "availability, claim, duplicate claim, rollover clock, XP delivery, UI refresh, and outage recovery.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 96
    },
    {
      "id": "C4-096-15970F96",
      "ordinal": 96,
      "section": "Feature readiness — account, onboarding, and progression",
      "priority": "P0",
      "title": "Research tree",
      "detail": "every node exists once, graph is reachable, requirements/costs match source, unlock is atomic, and modifiers take effect.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 97
    },
    {
      "id": "C4-097-CEB9E11F",
      "ordinal": 97,
      "section": "Feature readiness — account, onboarding, and progression",
      "priority": "VERIFY",
      "title": "Research drift",
      "detail": "node 9 is aligned; legacy node 45 and prior 42/43 numerical-ID drift must be resolved in the fresh mainnet artifact rather than merely tolerated.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 98
    },
    {
      "id": "C4-098-EB0529C6",
      "ordinal": 98,
      "section": "Feature readiness — account, onboarding, and progression",
      "priority": "P1",
      "title": "Progression UX",
      "detail": "show how each XP type is earned, why a node is locked, current/required values, and next useful unlock.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 99
    },
    {
      "id": "C4-099-B73F08A9",
      "ordinal": 99,
      "section": "Feature readiness — galaxy, navigation, and movement",
      "priority": "P0",
      "title": "Galaxy map data",
      "detail": "all regions/systems/coordinates/links/names/risk zones/faction ownership match the signed design artifact.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 100
    },
    {
      "id": "C4-100-F6C48ED3",
      "ordinal": 100,
      "section": "Feature readiness — galaxy, navigation, and movement",
      "priority": "P0",
      "title": "Topology decision",
      "detail": "revalidate the historical editor-vs-live zero-overlap link-graph change and certify the chosen 581/580-edge topology.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 101
    },
    {
      "id": "C4-101-A0E49E60",
      "ordinal": 101,
      "section": "Feature readiness — galaxy, navigation, and movement",
      "priority": "P0",
      "title": "Region/security rules",
      "detail": "test home/safe/medium/high/deep-space access for every faction, neutral player, NPC, and dynamically changed region.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 102
    },
    {
      "id": "C4-102-B17E2E04",
      "ordinal": 102,
      "section": "Feature readiness — galaxy, navigation, and movement",
      "priority": "P1",
      "title": "Map UX",
      "detail": "pan/zoom/select/frame/follow, labels, overlap, faction-specific “HOME” naming, loading, empty state, and large-fleet performance.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 103
    },
    {
      "id": "C4-103-A030EAF0",
      "ordinal": 103,
      "section": "Feature readiness — galaxy, navigation, and movement",
      "priority": "P0",
      "title": "Dock/undock",
      "detail": "normal, stale, destroyed, respawning, ownership-changed, Level-0, and starbase-takeover paths.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 104
    },
    {
      "id": "C4-104-327A0AC1",
      "ordinal": 104,
      "section": "Feature readiness — galaxy, navigation, and movement",
      "priority": "P0",
      "title": "Subwarp",
      "detail": "start, live position, stop, insufficient fuel, invalid destination, interrupted connection, and concurrent selection changes.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 105
    },
    {
      "id": "C4-105-5FAC5C9F",
      "ordinal": 105,
      "section": "Feature readiness — galaxy, navigation, and movement",
      "priority": "P0",
      "title": "Warp",
      "detail": "spool, direct warp, route validation, fuel/cost preview, invalid route, cancellation, arrival, and authoritative refresh.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 106
    },
    {
      "id": "C4-106-14CA3A2A",
      "ordinal": 106,
      "section": "Feature readiness — galaxy, navigation, and movement",
      "priority": "P0",
      "title": "Warp lanes",
      "detail": "fee calculation, access modifiers, accumulated modifiers, route changes, and destination readback.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 107
    },
    {
      "id": "C4-107-FBC1C42A",
      "ordinal": 107,
      "section": "Feature readiness — galaxy, navigation, and movement",
      "priority": "P0",
      "title": "Movement recovery",
      "detail": "idempotent state handler, timed-out confirmation, stale client projection, and safe retry guidance.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 108
    },
    {
      "id": "C4-108-BFDF1FE6",
      "ordinal": 108,
      "section": "Feature readiness — galaxy, navigation, and movement",
      "priority": "P1",
      "title": "Navigation planner",
      "detail": "either provide preflight/route feedback or explicitly accept and document the on-chain-error-only experience.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 109
    },
    {
      "id": "C4-109-34FF456F",
      "ordinal": 109,
      "section": "Feature readiness — starbase, inventory, fleets, and crew",
      "priority": "P0",
      "title": "Starbase registration",
      "detail": "first visit, re-registration, ownership/faction changes, Level-0 fallback, and sidecar re-witness.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 110
    },
    {
      "id": "C4-110-50686690",
      "ordinal": 110,
      "section": "Feature readiness — starbase, inventory, fleets, and crew",
      "priority": "P0",
      "title": "Port of Entry",
      "detail": "wallet ↔ starbase cargo and ships, ATAs, old authority migration, list stability, pagination, cancellation, and partial failure.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 111
    },
    {
      "id": "C4-111-B54C4781",
      "ordinal": 111,
      "section": "Feature readiness — starbase, inventory, fleets, and crew",
      "priority": "P0",
      "title": "Inventory transfer",
      "detail": "starbase ↔ fleet cargo/fuel/ammo, within-fleet moves, capacity checks, exact amounts, and post-confirm refresh.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 112
    },
    {
      "id": "C4-112-5BEC5453",
      "ordinal": 112,
      "section": "Feature readiness — starbase, inventory, fleets, and crew",
      "priority": "P0",
      "title": "Hangar/config bay",
      "detail": "deposited ships hydrate without route-order dependencies; ship assets/stats/configs are correct.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 113
    },
    {
      "id": "C4-113-F2C0DFB6",
      "ordinal": 113,
      "section": "Feature readiness — starbase, inventory, fleets, and crew",
      "priority": "P0",
      "title": "Form Fleet",
      "detail": "single/mixed/stacked hulls, per-hull config, weighted fleet-size rules, crew, ammo/cargo, capacity readouts, and research gates.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 114
    },
    {
      "id": "C4-114-E9AF12B5",
      "ordinal": 114,
      "section": "Feature readiness — starbase, inventory, fleets, and crew",
      "priority": "P0",
      "title": "Fleet concurrency",
      "detail": "node definitions, active-fleet cap, legacy node behavior, and error copy match the actual program.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 115
    },
    {
      "id": "C4-115-44105FBD",
      "ordinal": 115,
      "section": "Feature readiness — starbase, inventory, fleets, and crew",
      "priority": "P0",
      "title": "Manage Fleet",
      "detail": "add/remove ships, cargo, ammo, fuel, crew, config changes, passenger capacity, ownership/rental controller, and refresh.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 116
    },
    {
      "id": "C4-116-EEBAE094",
      "ordinal": 116,
      "section": "Feature readiness — starbase, inventory, fleets, and crew",
      "priority": "P0",
      "title": "Disband",
      "detail": "empty/nonempty fleet, dock requirements, escrow return, rent settlement, and stale account cleanup.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 117
    },
    {
      "id": "C4-117-D7490D70",
      "ordinal": 117,
      "section": "Feature readiness — starbase, inventory, fleets, and crew",
      "priority": "P0",
      "title": "Destroyed/respawn",
      "detail": "self-destruct, HP reset policy, tow timer, paid/free respawn, recover, and stranded assets.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 118
    },
    {
      "id": "C4-118-BA12FD3A",
      "ordinal": 118,
      "section": "Feature readiness — starbase, inventory, fleets, and crew",
      "priority": "P0",
      "title": "Fleet rentals, if in scope",
      "detail": "add/change/invalidate rental, controller authority at event time, expiry, return, recovery, and support tooling.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 119
    },
    {
      "id": "C4-119-4EAAD824",
      "ordinal": 119,
      "section": "Feature readiness — starbase, inventory, fleets, and crew",
      "priority": "P0",
      "title": "zXP rental attribution",
      "detail": "resolve zink-web#348, deploy it, and decide whether/how to backfill historical rented-fleet events.",
      "links": [
        {
          "label": "`zink-web#348`",
          "url": "https://github.com/staratlasmeta/zink-web/pull/348"
        }
      ],
      "baselineChecked": false,
      "sheetRow": 120
    },
    {
      "id": "C4-120-A768727D",
      "ordinal": 120,
      "section": "Feature readiness — starbase, inventory, fleets, and crew",
      "priority": "P0",
      "title": "Crew, if in scope",
      "detail": "real CrewMember discovery, roster initialization, mint/distribution, bind/unbind, capacity, XP, gear/perks, garrison, death/respawn, and trading.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 121
    },
    {
      "id": "C4-121-59A8FFE6",
      "ordinal": 121,
      "section": "Feature readiness — starbase, inventory, fleets, and crew",
      "priority": "P0",
      "title": "No mock crew in production",
      "detail": "build/deploy assertion plus live account proof.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 122
    },
    {
      "id": "C4-122-B6EE5B77",
      "ordinal": 122,
      "section": "Feature readiness — mining, scanning, combat, repair, and loot",
      "priority": "P0",
      "title": "Mining",
      "detail": "start, progress, stop, deposit, no-resource, full cargo, insufficient fuel/food/crew, interrupted WSS, and exact on-chain yield.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 123
    },
    {
      "id": "C4-123-3AD31912",
      "ordinal": 123,
      "section": "Feature readiness — mining, scanning, combat, repair, and loot",
      "priority": "P0",
      "title": "Silent-mining regression",
      "detail": "close or reproduce legacy ISSUE-023/057; UI success must never be shown when on-chain deposit is zero.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 124
    },
    {
      "id": "C4-124-3604A806",
      "ordinal": 124,
      "section": "Feature readiness — mining, scanning, combat, repair, and loot",
      "priority": "P0",
      "title": "Scanning",
      "detail": "prerequisites, patterns, cooldown, costs, result rendering, inventory delivery, and no empty “Ready” state.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 125
    },
    {
      "id": "C4-125-CD15172C",
      "ordinal": 125,
      "section": "Feature readiness — mining, scanning, combat, repair, and loot",
      "priority": "P0",
      "title": "Fleet-vs-fleet combat",
      "detail": "player↔player and player↔NPC as scoped; AP/ammo, safe-zone policy, target ownership, rewards, damage, death, loot, and refresh.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 126
    },
    {
      "id": "C4-126-FE33CBF7",
      "ordinal": 126,
      "section": "Feature readiness — mining, scanning, combat, repair, and loot",
      "priority": "P0",
      "title": "Fleet-vs-starbase combat",
      "detail": "target state, AP/ammo, damage, destruction, ownership/control transition, loot, reward/XP policy, and repair.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 127
    },
    {
      "id": "C4-127-4EFAFECB",
      "ordinal": 127,
      "section": "Feature readiness — mining, scanning, combat, repair, and loot",
      "priority": "P0",
      "title": "Safe-zone NPC policy, if in scope",
      "detail": "merge/deploy the reviewed movement gate (programs#859), combat gate/backfill, spawn gate, and authenticated NPC identity.",
      "links": [
        {
          "label": "`programs#859`",
          "url": "https://github.com/staratlasmeta/programs/pull/859"
        }
      ],
      "baselineChecked": false,
      "sheetRow": 128
    },
    {
      "id": "C4-128-8BE1301B",
      "ordinal": 128,
      "section": "Feature readiness — mining, scanning, combat, repair, and loot",
      "priority": "P0",
      "title": "Legacy NPC backfill",
      "detail": "set nonzero NPC faction/provenance before relying on NPC-specific combat or movement policy.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 129
    },
    {
      "id": "C4-129-A71A7360",
      "ordinal": 129,
      "section": "Feature readiness — mining, scanning, combat, repair, and loot",
      "priority": "P0",
      "title": "NPC spawn restriction",
      "detail": "prevent or operationally prohibit spawning NPC fleets inside protected LowRisk zones.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 130
    },
    {
      "id": "C4-130-D2EAEE11",
      "ordinal": 130,
      "section": "Feature readiness — mining, scanning, combat, repair, and loot",
      "priority": "P0",
      "title": "NPC controller safety",
      "detail": "exact cohort and target allowlists, rally/siege mutual exclusion, restart behavior, pause switch, and no adoption of unrelated fleets.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 131
    },
    {
      "id": "C4-131-FF01EE9C",
      "ordinal": 131,
      "section": "Feature readiness — mining, scanning, combat, repair, and loot",
      "priority": "P0",
      "title": "Reload",
      "detail": "AP/ammo bank semantics, max caps, missing ammo, partial reload, concurrency, and cost preview.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 132
    },
    {
      "id": "C4-132-A87858A8",
      "ordinal": 132,
      "section": "Feature readiness — mining, scanning, combat, repair, and loot",
      "priority": "P0",
      "title": "Repair",
      "detail": "docked and idle repair, Repair Kit requirement, self-target restrictions, None/amount encoding, “repair all,” pending repair coverage, and exact HP/SP/AP result.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 133
    },
    {
      "id": "C4-133-2DFC4098",
      "ordinal": 133,
      "section": "Feature readiness — mining, scanning, combat, repair, and loot",
      "priority": "P0",
      "title": "Stimulants, if in scope",
      "detail": "inventory, effect math, stacking, expiry, pips, target eligibility, combat interaction, and cleanup.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 134
    },
    {
      "id": "C4-134-D6855595",
      "ordinal": 134,
      "section": "Feature readiness — mining, scanning, combat, repair, and loot",
      "priority": "P0",
      "title": "Loot",
      "detail": "generation, authorization, capacity, expiry, retrieval, partial retrieval, destroyed-account cleanup, and double-claim prevention.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 135
    },
    {
      "id": "C4-135-C4D9AD34",
      "ordinal": 135,
      "section": "Feature readiness — mining, scanning, combat, repair, and loot",
      "priority": "P0",
      "title": "Reward abuse",
      "detail": "self-farm, allied-farm, NPC farm loops, repeated low-cost kills, multi-account behavior, and rate/cap enforcement.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 136
    },
    {
      "id": "C4-136-EB976AC9",
      "ordinal": 136,
      "section": "Feature readiness — mining, scanning, combat, repair, and loot",
      "priority": "P1",
      "title": "Combat observability",
      "detail": "target AP/HP/SP, action result, failure reason, signatures, reward breakdown, and before/after state.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 137
    },
    {
      "id": "C4-137-7914C1EF",
      "ordinal": 137,
      "section": "Feature readiness — crafting and Crafting Habs",
      "priority": "P0",
      "title": "Recipe integrity",
      "detail": "all recipes have valid inputs/outputs, intended usage limits, no accidental zero-input mints, valid factions/systems, and unique IDs.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 138
    },
    {
      "id": "C4-138-EE080D42",
      "ordinal": 138,
      "section": "Feature readiness — crafting and Crafting Habs",
      "priority": "P0",
      "title": "Recipe availability",
      "detail": "starbase level, research, faction, system, Hab tags, usage count, and crew gates agree in program and client.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 139
    },
    {
      "id": "C4-139-BF1E0C15",
      "ordinal": 139,
      "section": "Feature readiness — crafting and Crafting Habs",
      "priority": "P0",
      "title": "Start crafting",
      "detail": "amount, crew, duration, fee, input debit, Hab selection, account growth/rent, cancellation, and idempotent retry.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 140
    },
    {
      "id": "C4-140-E43F8147",
      "ordinal": 140,
      "section": "Feature readiness — crafting and Crafting Habs",
      "priority": "P0",
      "title": "Complete/collect",
      "detail": "output emission, full inventory, aged process, rent settlement, Hab account, repeated collect, and authoritative refresh.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 141
    },
    {
      "id": "C4-141-E52530E3",
      "ordinal": 141,
      "section": "Feature readiness — crafting and Crafting Habs",
      "priority": "P0",
      "title": "Cancel",
      "detail": "refund math, account cleanup, rent routing, partial work policy, and stale process recovery.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 142
    },
    {
      "id": "C4-142-DD44B490",
      "ordinal": 142,
      "section": "Feature readiness — crafting and Crafting Habs",
      "priority": "P0",
      "title": "Crafting XP",
      "detail": "duration/rate formula, caps, recipient, duplicate prevention, and progression pacing; resolve or replace the conflicting programs#823.",
      "links": [
        {
          "label": "`programs#823`",
          "url": "https://github.com/staratlasmeta/programs/pull/823"
        }
      ],
      "baselineChecked": false,
      "sheetRow": 143
    },
    {
      "id": "C4-143-AD6D4ABE",
      "ordinal": 143,
      "section": "Feature readiness — crafting and Crafting Habs",
      "priority": "P0",
      "title": "Crafting Hab placement",
      "detail": "ATLAS discoverability, profile validation, currency cache, building tags, source IDs, and mainnet program IDs.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 144
    },
    {
      "id": "C4-144-8A0A49B2",
      "ordinal": 144,
      "section": "Feature readiness — crafting and Crafting Habs",
      "priority": "P0",
      "title": "Hab buildings",
      "detail": "add/remove/finalize/cancel, construction time, resource production/consumption/swap, crew/power, and UI hydration.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 145
    },
    {
      "id": "C4-145-D2D5712F",
      "ordinal": 145,
      "section": "Feature readiness — crafting and Crafting Habs",
      "priority": "P0",
      "title": "Hab rent lifecycle",
      "detail": "top-up, pay, depletion, eviction, respawn, core/no-core recovery, deconstruct, and refund settlement.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 146
    },
    {
      "id": "C4-146-2C5D986D",
      "ordinal": 146,
      "section": "Feature readiness — crafting and Crafting Habs",
      "priority": "P0",
      "title": "Historical regressions",
      "detail": "prove Crystal Lattice generic cargo, unlimited/default recipe usage policy, and Hab modifier scale remain correct in generated mainnet data.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 147
    },
    {
      "id": "C4-147-90E2BA77",
      "ordinal": 147,
      "section": "Feature readiness — claim stakes",
      "priority": "P0",
      "title": "Placement",
      "detail": "planet/plot availability, stake type, intrinsic hub, resources, faction/research, ownership sidecar, atomic success, and optimistic hydration.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 148
    },
    {
      "id": "C4-148-59CCCE7F",
      "ordinal": 148,
      "section": "Feature readiness — claim stakes",
      "priority": "P0",
      "title": "Bundled hubs",
      "detail": "every hubValue > 0 intrinsic hub appears exactly once, cannot be removed, and legacy empty stakes can recover.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 149
    },
    {
      "id": "C4-149-66C0D167",
      "ordinal": 149,
      "section": "Feature readiness — claim stakes",
      "priority": "P0",
      "title": "Building design",
      "detail": "catalog identity/scroll stability, tags, central-hub rules, crew/power/storage, add/remove, and clear blockers.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 150
    },
    {
      "id": "C4-150-B396F2F3",
      "ordinal": 150,
      "section": "Feature readiness — claim stakes",
      "priority": "P0",
      "title": "Apply/finalize/cancel",
      "detail": "staged deltas, account refresh, concurrent edits, transaction grouping, partial failure, and resurrection prevention.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 151
    },
    {
      "id": "C4-151-F07081AD",
      "ordinal": 151,
      "section": "Feature readiness — claim stakes",
      "priority": "P0",
      "title": "Resource production",
      "detail": "tag chain, input/storage/output, process timing, collection, full storage, and no lying-success zero yield.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 152
    },
    {
      "id": "C4-152-B307C07E",
      "ordinal": 152,
      "section": "Feature readiness — claim stakes",
      "priority": "P0",
      "title": "Rent",
      "detail": "pay/top-up, depletion, eviction, respawn, owner/funder refund routing, and permissionless settlement.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 153
    },
    {
      "id": "C4-153-029AD876",
      "ordinal": 153,
      "section": "Feature readiness — claim stakes",
      "priority": "P0",
      "title": "Deconstruct/remove",
      "detail": "fresh and populated stakes, intrinsic hub rules, refunds, extractor deletion, and lamport invariants.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 154
    },
    {
      "id": "C4-154-FA09550F",
      "ordinal": 154,
      "section": "Feature readiness — claim stakes",
      "priority": "P0",
      "title": "Fleet transfer",
      "detail": "start/exit/force-exit/recover, cargo selection, owner filtering, stale transfer, starbase takeover, and rent settlement.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 155
    },
    {
      "id": "C4-155-F82CFE62",
      "ordinal": 155,
      "section": "Feature readiness — claim stakes",
      "priority": "P0",
      "title": "Resolve transfer recovery",
      "detail": "complete or explicitly supersede programs#838.",
      "links": [
        {
          "label": "`programs#838`",
          "url": "https://github.com/staratlasmeta/programs/pull/838"
        }
      ],
      "baselineChecked": false,
      "sheetRow": 156
    },
    {
      "id": "C4-156-5FD0C954",
      "ordinal": 156,
      "section": "Feature readiness — claim stakes",
      "priority": "P0",
      "title": "WebSocket chaos test",
      "detail": "drop the connection during place/edit/finalize/transfer and prove automatic state convergence.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 157
    },
    {
      "id": "C4-157-E9A70DAF",
      "ordinal": 157,
      "section": "Feature readiness — starbase upgrades and faction control",
      "priority": "P0",
      "title": "Upgrade map",
      "detail": "client displays only the current on-chain level map; stale/fully satisfied resources never prompt a wallet.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 158
    },
    {
      "id": "C4-158-CC17E05B",
      "ordinal": 158,
      "section": "Feature readiness — starbase upgrades and faction control",
      "priority": "P0",
      "title": "Contributions",
      "detail": "partial, exact, clipped concurrent remainder, wrong cargo, changed sequence, changed level, and u64 quantities.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 159
    },
    {
      "id": "C4-159-8A4C9EF3",
      "ordinal": 159,
      "section": "Feature readiness — starbase upgrades and faction control",
      "priority": "P0",
      "title": "Completion",
      "detail": "all requirements met, process start/continue/finalize, level transition, map refresh, rewards, and duplicate finalization.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 160
    },
    {
      "id": "C4-160-3DDD19B2",
      "ordinal": 160,
      "section": "Feature readiness — starbase upgrades and faction control",
      "priority": "P0",
      "title": "Recipe revision safety",
      "detail": "active deposits/processes survive config updates according to a documented and tested migration policy.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 161
    },
    {
      "id": "C4-161-EC3FC8EB",
      "ordinal": 161,
      "section": "Feature readiness — starbase upgrades and faction control",
      "priority": "P0",
      "title": "Faction ownership",
      "detail": "initialize, transfer, contest, capture, sidecar consistency, permissions, UI, and recovery.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 162
    },
    {
      "id": "C4-162-491D5D26",
      "ordinal": 162,
      "section": "Feature readiness — starbase upgrades and faction control",
      "priority": "P0",
      "title": "Region control",
      "detail": "dynamic risk changes propagate to movement/combat/NPC policies without stale cache.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 163
    },
    {
      "id": "C4-163-3061C473",
      "ordinal": 163,
      "section": "Feature readiness — starbase upgrades and faction control",
      "priority": "P0",
      "title": "Territory yield, if in scope",
      "detail": "entitlement, claim cadence, treasury, caps, faction transitions, and double-claim prevention.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 164
    },
    {
      "id": "C4-164-B0666434",
      "ordinal": 164,
      "section": "Feature readiness — starbase upgrades and faction control",
      "priority": "P0",
      "title": "Siege, if in scope",
      "detail": "campaign config, targets, victory conditions, ownership transition, rewards, pause/abort, and post-siege cleanup.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 165
    },
    {
      "id": "C4-165-AA10EB0A",
      "ordinal": 165,
      "section": "Feature readiness — marketplace, rewards, missions, and encounters",
      "priority": "P0",
      "title": "Local market",
      "detail": "create, fund, place, partial/full fill, cancel, withdraw, expiry, rent, precision, and inventory refresh.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 166
    },
    {
      "id": "C4-166-4C6447CE",
      "ordinal": 166,
      "section": "Feature readiness — marketplace, rewards, missions, and encounters",
      "priority": "P0",
      "title": "Medallion buy orders, if enabled",
      "detail": "operator status/dry-run/open/cancel/reprice from programs#856, dedicated buyers, escrow, and explicit daily rollover.",
      "links": [
        {
          "label": "`programs#856`",
          "url": "https://github.com/staratlasmeta/programs/pull/856"
        }
      ],
      "baselineChecked": false,
      "sheetRow": 167
    },
    {
      "id": "C4-167-5CD69AA6",
      "ordinal": 167,
      "section": "Feature readiness — marketplace, rewards, missions, and encounters",
      "priority": "P0",
      "title": "LP settlement",
      "detail": "contribution ledger, epoch roll, claim, expiry/sweep, reserve, faction pool, and exact UI amount.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 168
    },
    {
      "id": "C4-168-A8F41D23",
      "ordinal": 168,
      "section": "Feature readiness — marketplace, rewards, missions, and encounters",
      "priority": "P0",
      "title": "Reward source matrix",
      "detail": "for each of PVE, PVP, salvage, starbase destruction, upgrades, and repair, prove enabled/disabled state and payout unit.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 169
    },
    {
      "id": "C4-169-9568518A",
      "ordinal": 169,
      "section": "Feature readiness — marketplace, rewards, missions, and encounters",
      "priority": "P0",
      "title": "Faction treasury/market",
      "detail": "initialize, fund, authorization, status, offers, trade, accounting, and emergency pause.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 170
    },
    {
      "id": "C4-170-CAD8ADBE",
      "ordinal": 170,
      "section": "Feature readiness — marketplace, rewards, missions, and encounters",
      "priority": "P0",
      "title": "Missions, if in scope",
      "detail": "catalog, region/faction/outlaw gates, stake vault, treasury, start/settle/abort, expiry, replay, and UI parity.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 171
    },
    {
      "id": "C4-171-F47F26E4",
      "ordinal": 171,
      "section": "Feature readiness — marketplace, rewards, missions, and encounters",
      "priority": "P0",
      "title": "Mission off↔on parity",
      "detail": "one canonical stance classifier and signed parity test across every tagged case.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 172
    },
    {
      "id": "C4-172-F1B59E2A",
      "ordinal": 172,
      "section": "Feature readiness — marketplace, rewards, missions, and encounters",
      "priority": "P0",
      "title": "Encounters, if in scope",
      "detail": "scan trigger, pool, reveal/commit, trade, stock, treasury, expiry/reap, and master switch.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 173
    },
    {
      "id": "C4-173-85E36B92",
      "ordinal": 173,
      "section": "Feature readiness — marketplace, rewards, missions, and encounters",
      "priority": "P0",
      "title": "SDU intel lottery, if in scope",
      "detail": "decode/reveal/activate, odds, rank tables, region caps, mitigation, failure, and duplicate handling.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 174
    },
    {
      "id": "C4-174-FEB37C1F",
      "ordinal": 174,
      "section": "Feature readiness — marketplace, rewards, missions, and encounters",
      "priority": "P1",
      "title": "Notifications/deep links",
      "detail": "reward, crafting, production, market, mission, attack, and transfer notifications open the correct actionable state.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 175
    },
    {
      "id": "C4-175-4C5EFE25",
      "ordinal": 175,
      "section": "Client quality and failure handling",
      "priority": "P0",
      "title": "Exact release build",
      "detail": "dev/stage/prod build matrix is green and the production image digest is pinned.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 176
    },
    {
      "id": "C4-176-77698131",
      "ordinal": 176,
      "section": "Client quality and failure handling",
      "priority": "P0",
      "title": "Full client gates",
      "detail": "typecheck, lint, formatting, unit/integration suite, build, dependency audit, and bundle/runtime smoke.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 177
    },
    {
      "id": "C4-177-E61ECF80",
      "ordinal": 177,
      "section": "Client quality and failure handling",
      "priority": "P0",
      "title": "Browser journey suite",
      "detail": "fresh and returning user across every in-scope feature on the pinned candidate.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 178
    },
    {
      "id": "C4-178-FE3966DC",
      "ordinal": 178,
      "section": "Client quality and failure handling",
      "priority": "P0",
      "title": "Wallet matrix",
      "detail": "primary wallet, hot wallet, cancellation, rejection, timeout, unknown confirmation, confirmation-with-refresh-failure, and retry.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 179
    },
    {
      "id": "C4-179-6E267F68",
      "ordinal": 179,
      "section": "Client quality and failure handling",
      "priority": "P0",
      "title": "Stale-state safety",
      "detail": "refresh and revalidate ownership, identity, account sequence, balances, limits, and selected target immediately before signing.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 180
    },
    {
      "id": "C4-180-9FCE4912",
      "ordinal": 180,
      "section": "Client quality and failure handling",
      "priority": "P0",
      "title": "No silent no-ops",
      "detail": "every clickable mutation shows pending and a truthful confirmed/canceled/failed/unknown outcome.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 181
    },
    {
      "id": "C4-181-FACF9887",
      "ordinal": 181,
      "section": "Client quality and failure handling",
      "priority": "P0",
      "title": "No false success",
      "detail": "UI success requires finalized transaction plus authoritative state, or clearly distinguishes confirmation from refresh failure.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 182
    },
    {
      "id": "C4-182-06C93DFA",
      "ordinal": 182,
      "section": "Client quality and failure handling",
      "priority": "P0",
      "title": "Concurrency",
      "detail": "two tabs, two devices, two players editing/contributing/attacking simultaneously, and subscription reorder/race behavior.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 183
    },
    {
      "id": "C4-183-D2A38BE7",
      "ordinal": 183,
      "section": "Client quality and failure handling",
      "priority": "P0",
      "title": "RPC chaos",
      "detail": "disconnect, reconnect, missed delta, failover endpoint, delayed finality, rate limit, malformed response, and partial service outage.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 184
    },
    {
      "id": "C4-184-CBAF275E",
      "ordinal": 184,
      "section": "Client quality and failure handling",
      "priority": "P0",
      "title": "Error coverage",
      "detail": "map program custom errors to actionable player copy; preserve signature and support context.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 185
    },
    {
      "id": "C4-185-BD7CF23F",
      "ordinal": 185,
      "section": "Client quality and failure handling",
      "priority": "P1",
      "title": "Performance",
      "detail": "idle Galaxy CPU, memory growth, subscription count, large inventories, recipe catalog, building catalog, map labels, and long sessions.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 186
    },
    {
      "id": "C4-186-3C2EDF21",
      "ordinal": 186,
      "section": "Client quality and failure handling",
      "priority": "P1",
      "title": "Accessibility",
      "detail": "keyboard, focus, contrast, reduced motion, screen-reader labels, modal return focus, and error announcements.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 187
    },
    {
      "id": "C4-187-C4FD1DDC",
      "ordinal": 187,
      "section": "Client quality and failure handling",
      "priority": "P1",
      "title": "Supported devices",
      "detail": "explicitly certify or reject mobile/tablet and list supported desktop browsers/hardware.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 188
    },
    {
      "id": "C4-188-2EB3E6F1",
      "ordinal": 188,
      "section": "Client quality and failure handling",
      "priority": "P1",
      "title": "Analytics",
      "detail": "privacy-reviewed events for funnel, transaction outcome, feature errors, abandonment, and latency without leaking keys or sensitive wallet data.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 189
    },
    {
      "id": "C4-189-44D3EF08",
      "ordinal": 189,
      "section": "Infrastructure, indexers, and services",
      "priority": "P0",
      "title": "RPC/WSS production topology",
      "detail": "capacity, geographic failover, health checks, reconnect behavior, historical read consistency, and alerting.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 190
    },
    {
      "id": "C4-190-BF9EC475",
      "ordinal": 190,
      "section": "Infrastructure, indexers, and services",
      "priority": "P0",
      "title": "StarComm/pubsub",
      "detail": "startup, replay/gap handling, schema compatibility, backpressure, reconnect, and stale-data detection.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 191
    },
    {
      "id": "C4-191-9C2A8874",
      "ordinal": 191,
      "section": "Infrastructure, indexers, and services",
      "priority": "P0",
      "title": "Galaxy/support APIs",
      "detail": "production endpoints, auth, rate limits, CORS, caches, database migrations, backups, and rollback.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 192
    },
    {
      "id": "C4-192-467EDEB4",
      "ordinal": 192,
      "section": "Infrastructure, indexers, and services",
      "priority": "P0",
      "title": "zink-profile/zXP service",
      "detail": "mainnet source program IDs, decoder parity, reorg/finality policy, checkpointing, replay, and attribution correctness.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 193
    },
    {
      "id": "C4-193-9AAFB115",
      "ordinal": 193,
      "section": "Infrastructure, indexers, and services",
      "priority": "P0",
      "title": "Crew/indexing endpoint, if in scope",
      "detail": "merge or replace the dedicated crew DAS work and prove mainnet data freshness.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 194
    },
    {
      "id": "C4-194-5EC38007",
      "ordinal": 194,
      "section": "Infrastructure, indexers, and services",
      "priority": "P0",
      "title": "NPC/Nemesis workers, if in scope",
      "detail": "pinned image, config, exclusive lock, exact fleet adoption, restart behavior, pause switch, logs, and paging.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 195
    },
    {
      "id": "C4-195-8730F96C",
      "ordinal": 195,
      "section": "Infrastructure, indexers, and services",
      "priority": "P0",
      "title": "Secrets",
      "detail": "all production secrets in managed storage, least privilege, rotation, no .env drift, and no test credentials.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 196
    },
    {
      "id": "C4-196-15652C0D",
      "ordinal": 196,
      "section": "Infrastructure, indexers, and services",
      "priority": "P0",
      "title": "Backups",
      "detail": "databases, indexes/checkpoints, config artifacts, program buffers, key metadata, and finalized on-chain snapshots.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 197
    },
    {
      "id": "C4-197-9E770E89",
      "ordinal": 197,
      "section": "Infrastructure, indexers, and services",
      "priority": "P0",
      "title": "Capacity/load test",
      "detail": "expected launch concurrency plus headroom for RPC, WSS, API, database, workers, and client subscription fan-out.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 198
    },
    {
      "id": "C4-198-0CE5A7F3",
      "ordinal": 198,
      "section": "Infrastructure, indexers, and services",
      "priority": "P0",
      "title": "SLOs",
      "detail": "transaction build latency, confirmation latency, subscription convergence, API availability, and error budget.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 199
    },
    {
      "id": "C4-199-481DAFAA",
      "ordinal": 199,
      "section": "Infrastructure, indexers, and services",
      "priority": "P0",
      "title": "Dashboards",
      "detail": "client errors, program errors by instruction/code, RPC/WSS disconnects, reward issuance/reserves, stuck states, and NPC worker state.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 200
    },
    {
      "id": "C4-200-24F50A7C",
      "ordinal": 200,
      "section": "Infrastructure, indexers, and services",
      "priority": "P0",
      "title": "Alerts",
      "detail": "actionable thresholds, named on-call, runbook link, test page, and escalation path.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 201
    },
    {
      "id": "C4-201-2C6B85BE",
      "ordinal": 201,
      "section": "Infrastructure, indexers, and services",
      "priority": "P1",
      "title": "Cost controls",
      "detail": "RPC/API/compute/database budgets and anomaly alerts.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 202
    },
    {
      "id": "C4-202-05086995",
      "ordinal": 202,
      "section": "Security, abuse, and economic integrity",
      "priority": "P0",
      "title": "Threat model",
      "detail": "wallets/device keys, admin keys, program upgrades, profile permissions, markets, rewards, NPC automation, RPC spoof/staleness, and operator compromise.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 203
    },
    {
      "id": "C4-203-DF376CA7",
      "ordinal": 203,
      "section": "Security, abuse, and economic integrity",
      "priority": "P0",
      "title": "Authorization matrix",
      "detail": "every instruction and operator command mapped to signer, profile permission, owner/controller, program scope, and allowed target.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 204
    },
    {
      "id": "C4-204-3439C496",
      "ordinal": 204,
      "section": "Security, abuse, and economic integrity",
      "priority": "P0",
      "title": "Asset custody invariants",
      "detail": "no player asset can become irrecoverably stranded by overflow, stale sidecar, rent, account resize, transfer, rental, or destroyed state.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 205
    },
    {
      "id": "C4-205-7BF35C9A",
      "ordinal": 205,
      "section": "Security, abuse, and economic integrity",
      "priority": "P0",
      "title": "Arithmetic",
      "detail": "checked/saturating behavior where appropriate; no panic, wrap, precision loss, or UI-number truncation at worst-case aggregates.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 206
    },
    {
      "id": "C4-206-F3F978BA",
      "ordinal": 206,
      "section": "Security, abuse, and economic integrity",
      "priority": "P0",
      "title": "Market abuse",
      "detail": "self-trade, wash volume, price manipulation, escrow underfunding, stale orders, precision exploits, and admin buyer abuse.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 207
    },
    {
      "id": "C4-207-2AF32686",
      "ordinal": 207,
      "section": "Security, abuse, and economic integrity",
      "priority": "P0",
      "title": "Reward abuse",
      "detail": "multi-account farming, identity relinking, rental attribution, replay/backfill duplication, NPC collusion, and cap reset manipulation.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 208
    },
    {
      "id": "C4-208-1881C2D1",
      "ordinal": 208,
      "section": "Security, abuse, and economic integrity",
      "priority": "DECISION",
      "title": "zXP value and anti-Sybil policy",
      "detail": "if zXP has future value, define maturation/provisional windows, Discord/profile linkage rules, relink cooldown, watchlist handling, appeals, and incident response.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 209
    },
    {
      "id": "C4-209-F32473F7",
      "ordinal": 209,
      "section": "Security, abuse, and economic integrity",
      "priority": "P0",
      "title": "Admin-command safety",
      "detail": "status/dry-run by default, --execute for writes, expected-current digest, simulation, one send, finalized readback, and audit log.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 210
    },
    {
      "id": "C4-210-0BB3E12D",
      "ordinal": 210,
      "section": "Security, abuse, and economic integrity",
      "priority": "P0",
      "title": "Dependency/supply-chain review",
      "detail": "registries, vendored SDKs, Actions, containers, lockfiles, signatures, and critical CVEs.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 211
    },
    {
      "id": "C4-211-EAB9B57D",
      "ordinal": 211,
      "section": "Security, abuse, and economic integrity",
      "priority": "P0",
      "title": "External review",
      "detail": "obtain a fresh independent review of all mainnet-delta program code and migration tooling, not only historical audits.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 212
    },
    {
      "id": "C4-212-622BEEAE",
      "ordinal": 212,
      "section": "Security, abuse, and economic integrity",
      "priority": "P1",
      "title": "Bug bounty/disclosure",
      "detail": "intake channel, severity/SLA, emergency pause policy, and launch communication.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 213
    },
    {
      "id": "C4-213-30AA527D",
      "ordinal": 213,
      "section": "Operations, support, and incident response",
      "priority": "P0",
      "title": "Launch runbook",
      "detail": "exact commands, working directories, required environment, expected output, signer handoffs, stop points, and rollback points.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 214
    },
    {
      "id": "C4-214-02F7AF06",
      "ordinal": 214,
      "section": "Operations, support, and incident response",
      "priority": "P0",
      "title": "Two-person rule",
      "detail": "every mainnet program/config/treasury/admin mutation is witnessed and compared to the signed plan.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 215
    },
    {
      "id": "C4-215-8E1E93FA",
      "ordinal": 215,
      "section": "Operations, support, and incident response",
      "priority": "P0",
      "title": "Canary",
      "detail": "limited profiles/factions/assets first, with a defined observation window and expansion criteria.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 216
    },
    {
      "id": "C4-216-362586DC",
      "ordinal": 216,
      "section": "Operations, support, and incident response",
      "priority": "P0",
      "title": "Pause controls",
      "detail": "client maintenance mode, reward-source disable, NPC worker stop, market stop/cancel, and emergency program/config authority.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 217
    },
    {
      "id": "C4-217-EC9B4A18",
      "ordinal": 217,
      "section": "Operations, support, and incident response",
      "priority": "P0",
      "title": "Incident playbooks",
      "detail": "stuck fleet, stuck claim transfer, crafting output failure, reward overpay, market escrow issue, RPC divergence, compromised key, and bad program upgrade.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 218
    },
    {
      "id": "C4-218-3C2EC42E",
      "ordinal": 218,
      "section": "Operations, support, and incident response",
      "priority": "P0",
      "title": "Support tooling",
      "detail": "read-only profile/fleet/stake/crafting/market/reward inspectors with signatures and decoded state.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 219
    },
    {
      "id": "C4-219-DA39B65D",
      "ordinal": 219,
      "section": "Operations, support, and incident response",
      "priority": "P0",
      "title": "Player-facing status",
      "detail": "status page, maintenance copy, known-issues page, support route, and transaction-signature collection.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 220
    },
    {
      "id": "C4-220-3B9FE76E",
      "ordinal": 220,
      "section": "Operations, support, and incident response",
      "priority": "P0",
      "title": "Data correction policy",
      "detail": "which problems are fixed by program behavior, config update, compensating transaction, manual support, or never altered.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 221
    },
    {
      "id": "C4-221-98675A64",
      "ordinal": 221,
      "section": "Operations, support, and incident response",
      "priority": "P0",
      "title": "Compensation policy",
      "detail": "evidence required, authority, limits, accounting, and communication for losses caused by launch defects.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 222
    },
    {
      "id": "C4-222-2FF27F14",
      "ordinal": 222,
      "section": "Operations, support, and incident response",
      "priority": "P0",
      "title": "24/7 launch coverage",
      "detail": "named chain/client/infra/economy/support responders for the canary and public windows.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 223
    },
    {
      "id": "C4-223-7C5316CF",
      "ordinal": 223,
      "section": "Operations, support, and incident response",
      "priority": "P1",
      "title": "Post-launch cadence",
      "detail": "daily first-week triage, economy review, balance patch process, and public changelog.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 224
    },
    {
      "id": "C4-224-74956438",
      "ordinal": 224,
      "section": "Final validation campaigns",
      "priority": "P0",
      "title": "Legacy issue reconciliation",
      "detail": "re-run and disposition every entry in the fc-app journey issue ledger.",
      "links": [
        {
          "label": "fc-app journey issue ledger",
          "url": "https://github.com/staratlasmeta/star-atlas-tech/blob/main/packages/fc-app/journey-tests/ISSUES.md"
        }
      ],
      "baselineChecked": false,
      "sheetRow": 225
    },
    {
      "id": "C4-225-FA0A2C85",
      "ordinal": 225,
      "section": "Final validation campaigns",
      "priority": "P0",
      "title": "Fresh-user journey",
      "detail": "legal → wallet/device key → profile/Character/faction → starting assets → research → deposit → form fleet → move → mine/scan → return.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 226
    },
    {
      "id": "C4-226-BBF18F5E",
      "ordinal": 226,
      "section": "Final validation campaigns",
      "priority": "P0",
      "title": "Economy journey",
      "detail": "earn/receive assets → craft/build/upgrade/repair/market → claim reward → verify every source/sink and balance.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 227
    },
    {
      "id": "C4-227-92A6E716",
      "ordinal": 227,
      "section": "Final validation campaigns",
      "priority": "P0",
      "title": "Combat journey",
      "detail": "player/NPC/starbase targets in every risk zone, damage/reload/repair/death/loot/XP/LP, and forbidden PvP.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 228
    },
    {
      "id": "C4-228-793FB4CB",
      "ordinal": 228,
      "section": "Final validation campaigns",
      "priority": "P0",
      "title": "Claim journey",
      "detail": "place stake → bundled hub → build → transfer → produce → collect → edit → rent → evict/respawn/deconstruct.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 229
    },
    {
      "id": "C4-229-5ED3744B",
      "ordinal": 229,
      "section": "Final validation campaigns",
      "priority": "P0",
      "title": "Crafting-Hab journey",
      "detail": "place → build → fund → start → age → complete → collect → rent depletion → recover/deconstruct.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 230
    },
    {
      "id": "C4-230-A46566B2",
      "ordinal": 230,
      "section": "Final validation campaigns",
      "priority": "P0",
      "title": "Starbase journey",
      "detail": "register → contribute → concurrent contribution → upgrade completion → ownership/control effects.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 231
    },
    {
      "id": "C4-231-D86E368E",
      "ordinal": 231,
      "section": "Final validation campaigns",
      "priority": "P0",
      "title": "Marketplace journey",
      "detail": "create/order/fill/partial/cancel/withdraw/expiry, including insufficient funds and stale UI.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 232
    },
    {
      "id": "C4-232-70983B6B",
      "ordinal": 232,
      "section": "Final validation campaigns",
      "priority": "P0",
      "title": "Phase 3 journey, if in scope",
      "detail": "real crew → mission/encounter/SDU → faction state/territory → settlement/reward.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 233
    },
    {
      "id": "C4-233-FF429C30",
      "ordinal": 233,
      "section": "Final validation campaigns",
      "priority": "P0",
      "title": "Failure journey",
      "detail": "reject wallet, kill WSS, kill RPC, timeout confirmation, restart worker, stale account, full inventory, insufficient rent/SOL, and retry.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 234
    },
    {
      "id": "C4-234-912060FE",
      "ordinal": 234,
      "section": "Final validation campaigns",
      "priority": "P0",
      "title": "Migration journey",
      "detail": "oldest supported account/profile/fleet/stake through every affected action.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 235
    },
    {
      "id": "C4-235-F1DF352F",
      "ordinal": 235,
      "section": "Final validation campaigns",
      "priority": "P0",
      "title": "Load/soak",
      "detail": "representative bots/players for at least one full reward/day rollover and long enough to exercise rent, expiry, subscriptions, and worker restarts.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 236
    },
    {
      "id": "C4-236-E31FEE02",
      "ordinal": 236,
      "section": "Final validation campaigns",
      "priority": "P0",
      "title": "Final exact-state diff",
      "detail": "release plan versus deployed programs, program data, configs, flags, service images, secrets references, and live account digests.",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 237
    },
    {
      "id": "C4-237-E13BD9AA",
      "ordinal": 237,
      "section": "Go/no-go",
      "priority": "GATE",
      "title": "No open P0 without a written, signed scope disable that makes the behavior unreachable.",
      "detail": "",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 238
    },
    {
      "id": "C4-238-7FBFED58",
      "ordinal": 238,
      "section": "Go/no-go",
      "priority": "GATE",
      "title": "Every in-scope feature has a passing mainnet-shaped journey with signatures/screenshots/logs.",
      "detail": "",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 239
    },
    {
      "id": "C4-239-C7469955",
      "ordinal": 239,
      "section": "Go/no-go",
      "priority": "GATE",
      "title": "Every out-of-scope feature is disabled in client, service/operator, and on-chain configuration as applicable.",
      "detail": "",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 240
    },
    {
      "id": "C4-240-5FA3A7A1",
      "ordinal": 240,
      "section": "Go/no-go",
      "priority": "GATE",
      "title": "Program/IDL/SDK/config/client/service hashes match the signed manifest.",
      "detail": "",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 241
    },
    {
      "id": "C4-241-5B0D2EF3",
      "ordinal": 241,
      "section": "Go/no-go",
      "priority": "GATE",
      "title": "Security review has no unresolved critical/high finding.",
      "detail": "",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 242
    },
    {
      "id": "C4-242-045AE237",
      "ordinal": 242,
      "section": "Go/no-go",
      "priority": "GATE",
      "title": "Economy signers approve values, reserves, caps, and monitoring.",
      "detail": "",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 243
    },
    {
      "id": "C4-243-0989A635",
      "ordinal": 243,
      "section": "Go/no-go",
      "priority": "GATE",
      "title": "Rollback/pause and support drills have been executed successfully.",
      "detail": "",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 244
    },
    {
      "id": "C4-244-D83165C7",
      "ordinal": 244,
      "section": "Go/no-go",
      "priority": "GATE",
      "title": "Canary metrics remain inside thresholds for the full observation window.",
      "detail": "",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 245
    },
    {
      "id": "C4-245-644A48BE",
      "ordinal": 245,
      "section": "Go/no-go",
      "priority": "GATE",
      "title": "Release group records a final timestamped GO.",
      "detail": "",
      "links": [],
      "baselineChecked": false,
      "sheetRow": 246
    }
  ]
};
