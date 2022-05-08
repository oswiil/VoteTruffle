React.useEffect(() => {
  handleClick = async (index) => {
    try {
      //get data things
      proposalData = await getVotacion(index);
      if (proposalData.length != 0) {
        proposalData.name = Web3.utils.hexToAscii(proposalData.name);
        let _candidatos = [];
        proposalData.candidatos.forEach((candidato) =>
          _candidatos.push(Web3.utils.hexToAscii(candidato))
        );

        console.log(
          '🚀 ~ file: Vote.js ~ line 79 ~ handleClick= ~ proposalData.id',
          proposalData.id
        );
        // idVotacion = proposalData.id;
        proposalData.candidatos = _candidatos;
        // idVotacion = proposalData.id;
        setVotacionData(proposalData);
        //Votacion => Redux
        add_Votacion(proposalData);
        //Router things
        history.push(`/votar/${proposalData.id}`);
      }
    } catch (err) {
      console.log(err);
    }
    // history.push('/votacionDetalle');
    return proposalData;
  };
});
const add_Votacion = (votacionData) => dispatch(addVotacion(votacionData));

React.useEffect(() => {
  setLoading(true);

  async function fetchData() {
    try {
      isExecutable = true;
      proposal = await getIds();

      if (proposal.length != 0) {
        setVotaciones(proposal);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
    return proposal;
  }

  fetchData().then((result) => result.forEach((elem) => setId(elem)));

  console.log(__index);
}, []);

React.useEffect(() => {
  setLoading(true);

  async function fetchNames() {
    try {
      isExecutable = true;
      proposal = await getNames();

      if (proposal.length != 0) {
        setNombre(proposal.map((value) => Web3.utils.hexToAscii(value)));
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
    return proposal;
  }

  fetchNames();
}, []);
