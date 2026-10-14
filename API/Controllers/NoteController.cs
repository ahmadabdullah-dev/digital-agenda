namespace API.Controllers;
public class NoteController : BaseApiController
{
    private readonly INoteService _noteService;

    public NoteController(INoteService noteService)
    {
        _noteService = noteService;
    }
}
