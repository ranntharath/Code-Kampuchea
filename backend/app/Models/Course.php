<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;
    protected $fillable = ['title','description','thumbnail','price','discount_percent','category_id','is_free'];
        // many-to-one
    public function category(){
        return $this->belongsTo(Category::class);
    }
    
    public function lesson(){
        return $this->hasMany(Lesson::class);
    }
}
