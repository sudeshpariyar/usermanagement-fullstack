namespace server.Core.Models
{
    public class BaseEntity<TID>
    {
        public TID Id { get; set; }
        public DateTime CreatedAt { get; set; }= DateTime.Now;
        public DateTime UpdatedAt {  get; set; }= DateTime.Now;
        public bool IsDeleted { get; set; }= false;
        public bool IsActive {  get; set; }= true;
    }
}
