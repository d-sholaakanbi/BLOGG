const router = require ('express').Router();
const {
    getJournal, 
    getJournals, 
    createJournals, 
    deleteJournals, 
    updateJournals
} = require ("../controller/journal");

router.route ("/").get(getJournals).post(createJournals);
router
    .route ("/:journalId")
    .get(getJournal)
    .patch(updateJournals)
    .delete(deleteJournals);

module.exports = router;